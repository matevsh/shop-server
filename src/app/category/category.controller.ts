import { $catch } from '>/error-handling/catch';
import { httpCodes } from '>/http-codes';
import { $response } from '>/response';
import { getCategories } from '~/category/services/get-categories';
import { $validate } from '>/validate-body';
import { createCategoryBody } from '~/category/models/create-category';
import { createCategory } from '~/category/services/create-category';

export const getCategoriesController = $catch(async () => {
  const categories = await getCategories();
  return $response(httpCodes.ok, {
    data: categories,
  });
});

export const createCategoryController = $validate(
  createCategoryBody,
  async (req) => {
    await createCategory(req.body);
    return $response(httpCodes.created);
  }
);
