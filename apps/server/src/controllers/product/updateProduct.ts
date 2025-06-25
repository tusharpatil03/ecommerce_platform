import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { Product } from '../../models/Product';
import HandleError from '../../utils/Error/Error';
import { z } from 'zod';
import { UpdateProductInput } from '../../types/types';

type UpdateProduct = z.infer<typeof UpdateProductInput>;

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body: UpdateProduct = req.body;
  if (!req.params.id) {
    throw new HandleError('INVALID PRODUCTID', 'Provide product id', 400);
  }
  const productId: string = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new HandleError(
      'INVALID_PRODUCT_ID',
      'Invalid product ID format',
      400,
    );
  }

  try {
    await Product.findOneAndUpdate(
      { _id: productId },
      { $set: body },
      { runValidators: true },
    );

    res.status(200).json({
      message: 'Product Updated',
    });
    return;
  } catch (e) {
    console.log('Update Error:', e);
    throw new HandleError('PRODUCT', 'unable to update product', 500);
  }
};
