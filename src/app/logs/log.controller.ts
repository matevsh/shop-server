import { prisma } from '@/database/client';
import { $catch } from '>/error-handling/catch';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';

export const getLogsController = $catch(async () => {
  const logs = await prisma.log.findMany({});
  return $response(httpCodes.ok, {
    data: logs,
  });
});
