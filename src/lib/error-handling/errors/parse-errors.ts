type PrismaError = {
  name: string;
};

export const parseErrors = {
  invalid_body: {
    name: 'parse.invalid_body',
  },
  unknown: {
    name: 'parse.unknown_error',
  },
} as const satisfies Record<string, PrismaError>;
