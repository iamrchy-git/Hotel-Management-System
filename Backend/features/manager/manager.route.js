import express from 'express';
import { getBookingReport, getRevenueReport, getOccupancyReport, getFeedbackReport } from './manager.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const managerRouter = express.Router();

managerRouter.use(authenticate, restrictTo('manager', 'admin'));

managerRouter.get('/reports/bookings', getBookingReport);      // Generate Booking Report
managerRouter.get('/reports/revenue', getRevenueReport);       // Generate Revenue Report
managerRouter.get('/reports/occupancy', getOccupancyReport);   // Generate Occupancy Report
managerRouter.get('/reports/feedback', getFeedbackReport);     // Generate Feedback Report

export default managerRouter;
