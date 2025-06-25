import { Router } from 'express';
import { hello } from '../controllers/user/index';
import { signup } from '../controllers/user/signup';
import { login } from '../controllers/user/login';
import { validateData } from '../middlewares/inputValidator';
import { AuthInput } from '../types/types';
import { extendSession } from '../controllers/user/extendSession';
const router = Router();

router.get('/hello', hello);
router.post('/signup', validateData(AuthInput), signup);
router.post('/login', validateData(AuthInput), login);
router.post('/extend', extendSession);

export default router;
