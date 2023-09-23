import type { HttpResponse } from '~/lib/response/types';
import { httpResponses } from '~/lib/response/http-responses';

export function response(
  statusCode: keyof typeof httpResponses,
  overwrite?: Partial<HttpResponse>
) {
  const currentResponse = httpResponses[statusCode];
  Object.assign(currentResponse, overwrite);

  return currentResponse;
}
