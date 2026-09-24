import express from 'express';
import { createGuest, getAllGuests, getMyProfile, getGuestById, updateGuest } from './guest.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const guestRouter = express.Router();

guestRouter.use(authenticate);

guestRouter.post('/', createGuest);
guestRouter.get('/my-profile', getMyProfile);
guestRouter.get('/', restrictTo('admin', 'receptionist'), getAllGuests);
guestRouter.get('/:id', restrictTo('admin', 'receptionist'), getGuestById);
guestRouter.put('/:id', updateGuest);

export default guestRouter;
