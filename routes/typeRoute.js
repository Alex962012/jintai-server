import { Router } from "express";
import { getAll, add, update, remove } from "../controllers/typeController.js";
export const typeRoute = Router();
typeRoute.get("/getAll", getAll);
typeRoute.post("/add", add);
typeRoute.put("/update/:id", update);
typeRoute.delete("/remove/:id", remove);