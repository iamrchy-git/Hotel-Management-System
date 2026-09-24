import express from 'express';
import { createTask, getAllTasks, getMyTasks, updateTaskStatus } from './housekeeping.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const housekeepingRouter = express.Router();

housekeepingRouter.use(authenticate);

housekeepingRouter.post('/', restrictTo('admin'), createTask);
housekeepingRouter.get('/', restrictTo('admin', 'manager'), getAllTasks);
housekeepingRouter.get('/my-tasks', restrictTo('housekeeping'), getMyTasks);
housekeepingRouter.put('/:id/status', restrictTo('housekeeping', 'admin'), updateTaskStatus);

export default housekeepingRouter;
