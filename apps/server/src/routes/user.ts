import { Router } from "express";
import { hello } from "../controllers/user";
import { signup } from "../controllers/user/signup";
import { login } from "../controllers/user/login";
const router = Router();

router.get("/hello", hello);
router.post("/signup", signup);
router.post("/login", login);

export default router;
