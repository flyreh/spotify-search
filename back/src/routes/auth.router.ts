import express from "express";
import AuthController from "../controller/auth.controller";

const router = express.Router();

router.get("/login", AuthController.login);
router.get("/callback", AuthController.callback);
router.post("/refreshToken", AuthController.refreshToken);

export default router;