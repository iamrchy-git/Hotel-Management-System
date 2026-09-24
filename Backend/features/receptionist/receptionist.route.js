import express from 'express';
import { createReceptionist, getAllReceptionists, checkIn, checkOut } from './receptionist.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const receptionistRouter = express.Router();

receptionistRouter.use(authenticate);

receptionistRouter.post('/', restrictTo('admin'), createReceptionist);
receptionistRouter.get('/', restrictTo('admin'), getAllReceptionists);
receptionistRouter.post('/checkin/:bookingId', restrictTo('receptionist', 'admin'), checkIn);
receptionistRouter.post('/checkout/:bookingId', restrictTo('receptionist', 'admin'), checkOut);

export default receptionistRouter;
