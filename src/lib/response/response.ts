import type { HttpResponse } from '>/response/types';
import { httpResponses } from '>/response/http-responses';

export function $response(
  statusCode: keyof typeof httpResponses,
  overwrite?: Partial<HttpResponse>
) {
  const currentResponse = httpResponses[statusCode];
  return { ...structuredClone(currentResponse), ...overwrite };
}
