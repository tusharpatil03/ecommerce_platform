import { Router } from 'express';
import { createProduct } from '../controllers/product/createProduct';
import { isAuth } from '../middlewares/isAuth';
import { validateData } from '../middlewares/inputValidator';
import { isProductOwner } from '../middlewares/isProductOwner';
import { getProduct } from '../controllers/product/getProduct';
import { ProductInput, UpdateProductInput } from '../types/types';
import { updateProduct } from '../controllers/product/updateProduct';
import { getAllProducts } from '../controllers/product/getAllProducts';

const router = Router();

router.post('/', isAuth, validateData(ProductInput), createProduct);
router.get('/:id', isAuth, isProductOwner, getProduct);
router.put(
  '/:id',
  validateData(UpdateProductInput),
  isAuth,
  isProductOwner,
  updateProduct,
);
router.get('/', isAuth, getAllProducts);

export default router;
