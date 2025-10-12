import express from "express";
import {createUser, getUsers, getUserById, updateUser, deleteUser} from "./user.controller.js"
import { validateCreateUser, validateUpdateUser } from "../../middlewares/validationMiddleware.js";

const router = express.Router();

router.post('/', validateCreateUser,createUser);

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.put('/:userId', validateUpdateUser, updateUser);
router.delete('/:userId', deleteUser);

export default router;