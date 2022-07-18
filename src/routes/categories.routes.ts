import { Router } from "express";

const routes = Router()

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoryController from "../controllers/categories/listCategory.controller"
import listCategoryByIdController from '../controllers/categories/listCategoryById.controller'
import updateCategory from '../controllers/categories/updateCategory.controller'
import deleteCategoryController from '../controllers/categories/deleteCategory.controller'

routes.post("", createCategoryController)
routes.get("", listCategoryController)
routes.get("/one/:id", listCategoryByIdController)
routes.patch('/:id', updateCategory)
routes.delete('/:id', deleteCategoryController)

export default routes