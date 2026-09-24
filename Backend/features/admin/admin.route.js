import express from 'express';
import { manageUsers, updateUserRole, deleteUser, getAllBookings } from './admin.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.use(authenticate, restrictTo('admin'));

adminRouter.get('/users', manageUsers);                        // Manage Users
adminRouter.put('/users/:id/role', updateUserRole);            // Update user role
adminRouter.delete('/users/:id', deleteUser);                  // Delete user
adminRouter.get('/bookings', getAllBookings);                   // Manage Bookings

export default adminRouter;
