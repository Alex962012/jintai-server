import { Router } from "express";
import { getAll, add, update, remove, getOne } from "../controllers/productController.js";
// import { productValidation } from "../utils/validator";
export const productsRoute = Router();
productsRoute.get("/getAll", getAll);
productsRoute.post("/add", add);
productsRoute.put("/update/:id", update);
productsRoute.delete("/remove/:id", remove);
productsRoute.get('/:id', getOne)

