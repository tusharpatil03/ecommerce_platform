import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const removeProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { productId } = req.params;
  if (!productId) {
    res.status(400).json({ error: 'Product ID is required' });
    return;
  }

  const responce = await Product.deleteOne({ _id: productId });
  if (responce.deletedCount === 0) {
    res.status(404).json({ error: `Product with ID ${productId} not found` });
    return;
  }
  console.log(`Product with ID ${productId} removed successfully`);

  // Send a response back to the client
  res
    .status(200)
    .json({ message: `Product with ID ${productId} removed successfully` });
};
