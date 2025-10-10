import express from "express";
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "./category.controller.js"

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;