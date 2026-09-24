import express from 'express';
import { createRoom, getAllRooms, getAvailableRooms, getRoomById, updateRoom, deleteRoom } from './room.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const roomRouter = express.Router();

roomRouter.get('/available', getAvailableRooms);           // Public - Search Rooms
roomRouter.use(authenticate);
roomRouter.get('/', getAllRooms);
roomRouter.get('/:id', getRoomById);
roomRouter.post('/', restrictTo('admin'), createRoom);
roomRouter.put('/:id', restrictTo('admin'), updateRoom);
roomRouter.delete('/:id', restrictTo('admin'), deleteRoom);

export default roomRouter;
