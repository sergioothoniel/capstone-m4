import { Router } from "express";
import createProductController from "../controllers/products/createProducts.controller";
import deleteProductController from "../controllers/products/deleteProduct.controller";
import listProductsByIdController from "../controllers/products/listProductById.controller";
import listProductsController from "../controllers/products/listProducts.controller";
import updateProductsController from "../controllers/products/updateProducts.controller";

const productsRoutes = Router();

productsRoutes.post("", createProductController);
productsRoutes.get("", listProductsController);
productsRoutes.get("/:id", listProductsByIdController);
productsRoutes.patch("/:id", updateProductsController);
productsRoutes.delete("/:id", deleteProductController);

export default productsRoutes;
