import type { HttpResponse } from '~/lib/response/types';

export const httpResponses = {
  '422': {
    httpStatus: 422,
    success: false,
    message: 'Unprocessable Content',
  },
  '409': {
    httpStatus: 409,
    success: false,
    message: 'Conflict',
  },
  '400': {
    httpStatus: 400,
    success: false,
    message: 'Bad Request',
  },
  '500': {
    httpStatus: 500,
    success: false,
    message: 'Server Error',
  },
  '200': {
    httpStatus: 200,
    success: true,
    message: 'Ok',
  },
  '201': {
    httpStatus: 201,
    success: true,
    message: 'Created',
  },
  '403': {
    httpStatus: 403,
    success: false,
    message: 'Forbidden',
  },
  '401': {
    httpStatus: 401,
    success: false,
    message: 'Unauthorized',
  },
  '404': {
    httpStatus: 404,
    success: false,
    message: 'Not Found',
  },
} satisfies Record<PropertyKey, HttpResponse>;
