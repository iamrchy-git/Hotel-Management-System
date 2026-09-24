import express from 'express';
import { createBooking, getAllBookings, getMyBookings, getBookingById, updateBookingStatus, cancelBooking } from './booking.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const bookingRouter = express.Router();

bookingRouter.use(authenticate);

bookingRouter.post('/', restrictTo('guest'), createBooking);
bookingRouter.get('/my-bookings', restrictTo('guest'), getMyBookings);
bookingRouter.get('/', restrictTo('admin', 'receptionist', 'manager'), getAllBookings);
bookingRouter.get('/:id', getBookingById);
bookingRouter.put('/:id/status', restrictTo('admin', 'receptionist'), updateBookingStatus);
bookingRouter.delete('/:id', cancelBooking);

export default bookingRouter;
