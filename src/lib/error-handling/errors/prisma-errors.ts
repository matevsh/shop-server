type PrismaError = {
  code: string;
  name: string;
};

export const prismaError = {
  unique: {
    name: 'prisma.unique_constraint',
    code: 'P2002',
  },
  validation: {
    name: 'prisma.validation_error',
    code: 'P2007',
  },
  unknown: {
    name: 'prima.unknown_error',
    code: '',
  },
} as const satisfies Record<string, PrismaError>;
