import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../../models/Product';
import { InterfaceUser, User } from '../../models/User';
import HandleError from '../../utils/Error/Error';
import { InterfaceProduct } from '../../models/Product';

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.session || !req.session.isAuth) {
    throw new HandleError(
      'UNAUTHORIZED ERROR',
      'user is not authorized, missing user in request',
      401,
    );
  }

  const user: InterfaceUser = (await User.findOne({
    _id: req.session.userId,
  }).lean()) as InterfaceUser;

  if (!user) {
    throw new HandleError('USER NOT FOUND', 'user not found in database', 401);
  }

  const existingProduct: InterfaceProduct = (await Product.findOne({
    key: req.body.key,
    owner: user._id,
  }).lean()) as InterfaceProduct;

  if (existingProduct) {
    throw new HandleError(
      'PRODUCT EXIST',
      `Product with key ${req.body.key} already exist`,
      400,
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product: InterfaceProduct | null = (await new Product({
      ...req.body,
      owner: user._id,
      rating: 1, // Default rating
      stock: req.body.stock || 1, // Default stock
    }).save({ session })) as InterfaceProduct;

    await User.findByIdAndUpdate(
      user._id,
      { $push: { products: product._id } },
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new HandleError('DATABASE ERROR', 'Failed to create product', 500);
  } finally {
    await session.endSession();
  }

  const product: InterfaceProduct = (await Product.findOne({
    key: req.body.key,
    owner: user._id,
  }).lean()) as InterfaceProduct;

  if (!product) {
    throw new HandleError(
      'PRODUCT NOT FOUND',
      `Product with key ${req.body.key} not found`,
      404,
    );
  }

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: {
      id: product._id,
      key: product.key,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
    },
  });
};
