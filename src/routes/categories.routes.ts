import { Router } from "express";

const routes = Router();

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoryController from "../controllers/categories/listCategory.controller";
import listCategoryByIdController from "../controllers/categories/listCategoryById.controller";
import updateCategory from "../controllers/categories/updateCategory.controller";
import deleteCategoryController from "../controllers/categories/deleteCategory.controller";

import {
  validateCategoryCreate,
  categoryCreateSchema,
} from "../middlewares/validations/validateCategoryCreate.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

routes.post(
  "",
  ensureAuthMiddleware,
  validateCategoryCreate(categoryCreateSchema),
  createCategoryController
);
routes.get("", ensureAuthMiddleware, listCategoryController);
routes.get("/one/:id",ensureAuthMiddleware, listCategoryByIdController);
routes.patch("/:id", ensureAuthMiddleware, updateCategory);
routes.delete("/:id", ensureAuthMiddleware, deleteCategoryController);

export default routes;
