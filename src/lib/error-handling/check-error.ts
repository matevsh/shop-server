import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { response } from '~/lib/response/response';
import { prismaError } from '~/lib/error-handling/errors/prisma-errors';
import { prisma } from '~/database/client';
import { httpCodes } from '~/lib/http-codes';
import { InvalidBodyError } from '~/lib/validate-body/errors/invalid-body';
import { parseErrors } from '~/lib/error-handling/errors/parse-errors';
import { UnknownParsingError } from '~/lib/validate-body/errors/unknown';

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

      return response(httpCodes.conflict);
    }

    if (e.code === prismaError.validation.code) {
      await prisma.log.create({
        data: {
          name: prismaError.validation.name,
          error: true,
          message: JSON.stringify(e.message),
        },
      });
      return response(httpCodes.unprocessable_content);
    }

    await prisma.log.create({
      data: {
        name: prismaError.unknown.name,
        error: true,
        message: JSON.stringify(e.message),
      },
    });

    return response(httpCodes.bad_request);
  }

  if (e instanceof InvalidBodyError) {
    await prisma.log.create({
      data: {
        name: parseErrors.invalid_body.name,
        error: true,
        message: JSON.stringify(e.message),
      },
    });

    return response(httpCodes.unprocessable_content);
  }

  if (e instanceof UnknownParsingError) {
    await prisma.log.create({
      data: {
        name: parseErrors.unknown.name,
        error: true,
        message: JSON.stringify(e.message),
      },
    });

    return response(httpCodes.unprocessable_content);
  }

  return response(httpCodes.server_error);
}
