import { Router } from "express";

import createProductController from "../controllers/products/createProducts.controller";
import deleteProductController from "../controllers/products/deleteProduct.controller";
import listProductsByIdController from "../controllers/products/listProductById.controller";
import listProductsController from "../controllers/products/listProducts.controller";
import listProductsFormatedController from "../controllers/products/listProductsFormated.controller";
import updateProductsController from "../controllers/products/updateProducts.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const productsRoutes = Router();

productsRoutes.post("", ensureAuthMiddleware, createProductController);
productsRoutes.get("", ensureAuthMiddleware, listProductsController);
productsRoutes.get("/listall", ensureAuthMiddleware, listProductsFormatedController)
productsRoutes.get("/:id", ensureAuthMiddleware, listProductsByIdController);
productsRoutes.patch("/:id", ensureAuthMiddleware, updateProductsController);
productsRoutes.delete("/:id", ensureAuthMiddleware, deleteProductController);

export default productsRoutes;
