import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Product } from '../../models/Product';
import HandleError from '../../utils/Error/Error';
import { UpdateProductInput } from '../../types/types';

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body;
  if (!req.params.id) {
    throw new HandleError('INVALID PRODUCTID', 'Provide product id', 400);
  }
  const productId: string | Types.ObjectId = req.params.id;

  try {
    const product = await Product.updateOne(
      {
        id: productId,
      },
      {
        ...body,
      },
    );
    res.status(200).json({
      ...product,
    });
  } catch (e) {
    throw new HandleError('PRODUCT', 'unable to update product', 500);
  }
};
