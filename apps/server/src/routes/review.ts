import { Router } from 'express';
import { isAuth } from '../middlewares/isAuth';
import { validateData } from '../middlewares/inputValidator';
import { reviewSchema } from '../types/types';
import { createReview } from '../controllers/review/createReview';

const router = Router();

router.post('/:id', isAuth, validateData(reviewSchema), createReview);

export default router;
