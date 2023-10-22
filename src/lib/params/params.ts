import type { Request } from 'express';
import { MissingParamsError } from '>/params/errors/missing-params';

export function $params(
  req: Request,
  keys: string | string[]
): Record<string, string> {
  console.log(req.params, keys);
  if (Array.isArray(keys)) {
    return keys.reduce((acc, key) => {
      if (req.params[key]) {
        return {
          ...acc,
          [key]: req.query[key],
        };
      }
      throw new MissingParamsError(`Missing param: ${key}`);
    }, {});
  }

  const query = req.params[keys];
  if (query) {
    return {
      [keys]: String(query),
    };
  } else throw new MissingParamsError(`Missing param: ${keys}`);
}
