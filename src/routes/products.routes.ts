import { Router } from "express";
import createProductController from "../controllers/products/createProducts.controller";

const productsRoutes = Router();

productsRoutes.post("", createProductController);

export default productsRoutes;
