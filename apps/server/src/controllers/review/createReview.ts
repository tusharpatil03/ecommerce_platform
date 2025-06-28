import { Request, Response } from 'express';
import { Review } from '../../models/Review';
import { User } from '../../models/User';
import { Product } from '../../models/Product';
import { z } from 'zod';
import { reviewSchema } from '../../types/types';
import { Types } from 'mongoose';

type ReviewInput = z.infer<typeof reviewSchema>;

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data: ReviewInput = req.body;
  const productId: string = req.params.id as string;

  console.log('ProductId:', req.params);

  if (!req.session || !req.session.isAuth) {
    throw new Error('Unauthorized');
  }

  const user = await User.findOne({
    _id: new Types.ObjectId(req.session.userId as string),
  });
  if (!user) {
    throw new Error('Unauthorized');
  }
  const product = await Product.findOne({
    _id: new Types.ObjectId(productId as string),
  });

  if (!product) {
    throw new Error('Product Not found');
  }

  const existingReview = await Review.findOne({
    $and: [
      { product: new Types.ObjectId(productId) },
      { user: new Types.ObjectId(req.session.userId) },
    ],
  });

  if (existingReview) {
    throw new Error('you already reviewd product');
  }

  const review = new Review({
    comment: data.comment,
    rating: data.rating,
    user: req.session.userId,
    product: productId,
  });

  await review.save();

  res.status(200).json({
    success: true,
  });
};
