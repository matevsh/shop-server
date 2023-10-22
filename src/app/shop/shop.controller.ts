import { $validate } from '>/validate-body';
import { createShopBody } from '~/shop/models/create-shop-body';
import { createShop } from '~/shop/services/create-shop';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';
import { getShops } from '~/shop/services/get-shops';
import { $catch } from '>/error-handling/catch';
import { $verify } from '>/jwt/jwt';
import type { Session } from '@/common/types/session';

export const createShopController = $validate(createShopBody, async (req) => {
  const token = req.cookies?.accessToken;
  const data = $verify<Session>(token);

  if (data.error) return $response(httpCodes.unauthorized);

  const createShopData = { ...req.body, userId: data.result.uuid };
  const shop = await createShop(createShopData);

  return $response(httpCodes.created, {
    data: shop,
  });
});

export const getShopsController = $catch(async () => {
  return $response(httpCodes.ok, {
    data: await getShops(),
  });
});
