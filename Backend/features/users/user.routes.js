import express from 'express';
import {getAllUsers, getUserById, updateUser, deleteUser} from './user.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.get('/', restrictTo('admin'), getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', restrictTo('admin'), deleteUser);

export default userRouter;
