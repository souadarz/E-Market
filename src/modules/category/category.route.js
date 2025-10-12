import express from "express";
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "./category.controller.js";
import { validateCreateCategory, validateUpdateCategory } from "../../middlewares/validationMiddleware.js";

const router = express.Router();

router.post('/', validateCreateCategory, createCategory);
router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', validateUpdateCategory, updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;