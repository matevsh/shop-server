import type { Request } from 'express';

export function $queryParams(req: Request, keys: string | string[]) {
  if (Array.isArray(keys)) {
    return keys.reduce((acc, key) => {
      if (req.query[key]) {
        return {
          ...acc,
          [key]: req.query[key],
        };
      }
      return acc as Record<(typeof keys)[number], string>;
    }, {});
  }

  const query = req.query[keys];
  if (query) {
    return {
      [keys]: query,
    };
  } else return {};
}
