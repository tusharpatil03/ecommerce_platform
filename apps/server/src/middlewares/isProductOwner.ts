import { NextFunction, Request, Response } from 'express';
import { InterfaceProduct, Product } from '../models/Product';
import HandleError from '../utils/Error/Error';
import { Types } from 'mongoose';

export const isProductOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const productId = req.params.id;
  if (!req.session || !req.session.isAuth) {
    throw new HandleError(
      'UnAuthentication Error',
      'user is not authenticated',
      401,
    );
  }
  const userId = req.session.userId;

  // if (!productId) {
  //     throw new HandleError("UNDEFINED ERROR", "Product ID not found in request, Please Provide Product Id", 400)
  // }

  // if (!userId) {
  //     throw new HandleError("UNAUTHORIZED ERROR", "user is not authorized", 401)
  // }

  const product: InterfaceProduct = (await Product.findOne({
    _id: new Types.ObjectId(productId),
  }).lean()) as InterfaceProduct;

  if (!product) {
    throw new HandleError(
      'PRODUCT NOT FOUND',
      `Product with id ${productId} not found`,
      404,
    );
  }

  if (userId !== product.owner?._id.toString()) {
    throw new HandleError(
      'UNAUTHORIZED',
      'You are not authorized to perform this action',
      403,
    );
  } else {
    next();
  }
};
