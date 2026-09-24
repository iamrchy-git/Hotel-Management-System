import express from 'express';
import { makePayment, getAllPayments, getPaymentByBooking } from './payment.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const paymentRouter = express.Router();

paymentRouter.use(authenticate);

paymentRouter.post('/', makePayment);
paymentRouter.get('/', restrictTo('admin', 'manager', 'receptionist'), getAllPayments);
paymentRouter.get('/booking/:bookingId', getPaymentByBooking);

export default paymentRouter;
