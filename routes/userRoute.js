import { Router } from "express";
import { registration, login, check } from "../controllers/userController.js";
export const userRoute = Router();
userRoute.post("/registration", registration);
userRoute.post("/login", login);
userRoute.get("/auth", check);