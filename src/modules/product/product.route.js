import express from "express";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "./product.controller.js"
import { validateCreateProduct, validateUpdateProduct } from "../../middlewares/validationMiddleware.js"

const router = express.Router();

router.post('/', validateCreateProduct, createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', validateUpdateProduct, updateProduct);
router.delete('/:productId', deleteProduct);

export default router;