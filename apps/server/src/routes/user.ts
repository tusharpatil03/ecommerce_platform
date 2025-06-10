import { Router } from "express";
import { hello } from "../controllers/user";
import { signup } from "../controllers/user/signup";
const router = Router();

router.get("/hello", hello);
router.post("/signup", signup);

export default router;
