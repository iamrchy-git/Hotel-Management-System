import Receptionist from './receptionist.model.js';
import Booking from '../bookings/booking.model.js';
import Room from '../rooms/room.model.js';

// Create receptionist profile
export const createReceptionistService = async (userId, data) => {
    const existing = await Receptionist.findOne({ where: { userId } });
    if (existing) throw { status: 400, message: 'Profile already exists' };
    return await Receptionist.create({ ...data, userId });
};

// Get all receptionists
export const getAllReceptionistsService = async () => {
    return await Receptionist.findAll();
};

// Check-in (updates booking status to checked_in, room to occupied)
export const checkInService = async (bookingId) => {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw { status: 404, message: 'Booking not found' };
    if (booking.status !== 'confirmed') throw { status: 400, message: 'Booking is not confirmed' };
    await booking.update({ status: 'checked_in' });
    await Room.update({ status: 'occupied' }, { where: { id: booking.roomId } });
    return booking;
};

// Check-out (updates booking status to checked_out, room to available)
export const checkOutService = async (bookingId) => {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw { status: 404, message: 'Booking not found' };
    if (booking.status !== 'checked_in') throw { status: 400, message: 'Guest is not checked in' };
    await booking.update({ status: 'checked_out' });
    await Room.update({ status: 'available' }, { where: { id: booking.roomId } });
    return booking;
};
