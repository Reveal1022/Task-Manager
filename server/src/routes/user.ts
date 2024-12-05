import { Router } from "express";
import { registerUser, userLogin } from "../controllers/userController";

const router = Router();

//register user api
router.post("/register", registerUser);

//login user api
router.post("/login", userLogin);

export default router;
