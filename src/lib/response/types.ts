export type HttpResponse =
  | {
      success: true;
      httpStatus: number;
      message: string;
      data?: unknown;
    }
  | {
      success: false;
      httpStatus: number;
      message: string;
    };
