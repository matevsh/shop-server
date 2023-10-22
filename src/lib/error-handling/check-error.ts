import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { $response } from '>/response/response';
import { prismaError } from '>/error-handling/errors/prisma-errors';
import { prisma } from '@/database/client';
import { httpCodes } from '>/http-codes';
import { InvalidBodyError } from '>/validate-body/errors/invalid-body';
import { parseErrors } from '>/error-handling/errors/parse-errors';
import { UnknownParsingError } from '>/validate-body/errors/unknown';
import { MissingParamsError } from '>/params/errors/missing-params';

export async function checkError(e: unknown) {
  if (e instanceof PrismaClientKnownRequestError) {
    if (e.code === prismaError.unique.code) {
      await prisma.log.create({
        data: {
          name: prismaError.unique.name,
          error: true,
          message: JSON.stringify(e.message),
        },
      });

      return $response(httpCodes.conflict);
    }

    if (e.code === prismaError.validation.code) {
      await prisma.log.create({
        data: {
          name: prismaError.validation.name,
          error: true,
          message: JSON.stringify(e.message),
        },
      });
      return $response(httpCodes.unprocessable_content);
    }

    await prisma.log.create({
      data: {
        name: prismaError.unknown.name,
        error: true,
        message: JSON.stringify(e.message),
      },
    });

    return $response(httpCodes.bad_request);
  }

  if (e instanceof InvalidBodyError) {
    await prisma.log.create({
      data: {
        name: parseErrors.invalid_body.name,
        error: true,
        message: JSON.stringify(e.cause),
      },
    });

    return $response(httpCodes.unprocessable_content);
  }

  if (e instanceof UnknownParsingError) {
    await prisma.log.create({
      data: {
        name: parseErrors.unknown.name,
        error: true,
        message: JSON.stringify(e),
      },
    });

    return $response(httpCodes.unprocessable_content);
  }

  if (e instanceof MissingParamsError) {
    await prisma.log.create({
      data: {
        name: e.name,
        error: true,
        message: JSON.stringify(e.message),
      },
    });

    return $response(httpCodes.unprocessable_content, {
      message: e.message,
    });
  }

  return $response(httpCodes.server_error);
}
