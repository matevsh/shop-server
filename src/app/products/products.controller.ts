import { $validate } from '>/validate-body';
import { $response } from '>/response';
import { createProductSchema } from '~/products/models/create-product';
import { httpCodes } from '>/http-codes';
import { createProduct } from '~/products/services/create-product';
import { $catch } from '>/error-handling/catch';
import { getProducts } from '~/products/services/get-products';
import { getProductById } from '~/products/services/get-product-by-id';
import { $params } from '>/params/params';

export const createProductController = $validate(
  createProductSchema,
  async (req) => {
    return $response(httpCodes.created, {
      data: {
        product: await createProduct(req.body),
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

export const getProductByIdController = $catch(async (req) => {
  const params = $params(req, 'id');

  return $response(httpCodes.ok, {
    data: {
      product: await getProductById(params.id),
    },
  });
});
