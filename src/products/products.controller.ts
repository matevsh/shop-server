import { $validate } from '~/lib/validate-body';
import { $response } from '~/lib/response';
import { createProductSchema } from '~/products/models/create-product';
import { httpCodes } from '~/lib/http-codes';
import { createProduct } from '~/products/services/create-product';
import { $catch } from '~/lib/error-handling/catch';
import { getProducts } from '~/products/services/get-products';

export const createProductController = $validate(
  createProductSchema,
  async (req) => {
    const { title, price } = req.body;

    return $response(httpCodes.created, {
      data: {
        product: await createProduct(title, price),
      },
    });
  }
);

export const getProductsController = $catch(async () => {
  return $response(httpCodes.ok, {
    data: {
      products: await getProducts(),
    },
  });
});
