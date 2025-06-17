import { Request, Response } from 'express';
import { InterfaceProduct, Product } from '../../models/Product';
import HandleError from '../../utils/Error/Error';

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const productId = req.params.id;

  const product: InterfaceProduct = (await Product.findOne({
    _id: productId,
  }).lean()) as InterfaceProduct;

  if (!product) {
    throw new HandleError(
      'PRODUCT NOT FOUND',
      `Product with id ${productId} not found`,
      404,
    );
  }

  res.status(200).json({
    message: 'Product found',
    product: {
      id: product._id,
      key: product.key,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
    },
  });
};
