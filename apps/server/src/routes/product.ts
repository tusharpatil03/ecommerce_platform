import { Router } from 'express';
import { createProduct } from '../controllers/product/createProduct';
import { isAuth } from '../middlewares/isAuth';
import { validateData } from '../middlewares/inputValidator';
import { isProductOwner } from '../middlewares/isProductOwner';
import { getProduct } from '../controllers/product/getProduct';
import { ProductInput } from '../types/types';

const router = Router();

router.post('/', isAuth, validateData(ProductInput), createProduct);
router.get('/:id', isAuth, isProductOwner, getProduct);

export default router;
