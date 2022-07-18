import { Router } from "express";
import createProductController from "../controllers/products/createProducts.controller";
import listProductsController from "../controllers/products/listProducts.controller";

const productsRoutes = Router();

productsRoutes.post("", createProductController);
productsRoutes.get("", listProductsController);

export default productsRoutes;
