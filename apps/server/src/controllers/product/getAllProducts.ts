import { Request, Response } from 'express';
import HandleError from '../../utils/Error/Error';
import { InterfaceProduct, Product } from '../../models/Product';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    throw new HandleError(
      'UnAuthentication Error',
      'user is not authenticated',
      401,
    );
  }
  const userId: string = req.user.id;

  const products: InterfaceProduct[] = (await Product.find({
    owner: userId,
  }).lean()) as InterfaceProduct[];

  if (!products || !products[0]) {
    res.status(404).json({
      message: 'No Products Found',
    });
    return;
  }

  res.status(200).json({
    products,
  });
  return;
};
