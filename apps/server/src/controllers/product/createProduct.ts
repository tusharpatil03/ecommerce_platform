import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

interface InterfaceProduct {
  key: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  images: { public_id: string; url: string }[];
  category?:
    | 'electronics'
    | 'clothing'
    | 'wearings'
    | 'food'
    | 'beauty'
    | 'mechanical'
    | 'drinks'
    | 'any';
  stock?: number;
  owner: mongoose.Schema.Types.ObjectId;
}

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = await User.findOne({ id: req.cookies.userId });
  if (!user) {
    throw new Error('UnAuthorized');
  }
  const data: InterfaceProduct = req.body;

  const product = new Product({
    ...data,
  });

  product.owner = req.cookies.userId;

  await product.save();

  const createdProduct = await Product.findOne({
    $and: [{ key: data.key }, { owner: user.id }],
  });

  res.json({
    ...createdProduct,
  });
};
