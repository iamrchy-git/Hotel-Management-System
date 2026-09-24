import Booking from './booking.model.js';
import Room from '../rooms/room.model.js';

// Create booking (Make Booking use case)
export const createBookingService = async (guestId, data) => {
    const { roomId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = data;

    if (!roomId || !checkInDate || !checkOutDate) {
        throw { status: 400, message: 'roomId, checkInDate and checkOutDate are required' };
    }

    const room = await Room.findByPk(roomId);
    if (!room) throw { status: 404, message: 'Room not found' };
    if (room.status !== 'available') throw { status: 400, message: 'Room is not available' };

    // Calculate total amount
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (nights <= 0) throw { status: 400, message: 'Check-out must be after check-in' };
    const totalAmount = nights * parseFloat(room.pricePerNight);

    // Update room status
    await room.update({ status: 'booked' });

    const booking = await Booking.create({
        guestId, roomId, checkInDate, checkOutDate,
        numberOfGuests: numberOfGuests || 1,
        totalAmount,
        specialRequests,
        status: 'confirmed',
    });

    return booking;
};

// Get all bookings
export const getAllBookingsService = async () => {
    return await Booking.findAll({ include: [{ model: Room }] });
};

// Get booking by ID
export const getBookingByIdService = async (id) => {
    const booking = await Booking.findByPk(id, { include: [{ model: Room }] });
    if (!booking) throw { status: 404, message: 'Booking not found' };
    return booking;
};

// Get bookings by guestId (View Booking use case)
export const getBookingsByGuestService = async (guestId) => {
    return await Booking.findAll({ where: { guestId }, include: [{ model: Room }] });
};

// Update booking status
export const updateBookingStatusService = async (id, status) => {
    const booking = await Booking.findByPk(id);
    if (!booking) throw { status: 404, message: 'Booking not found' };
    await booking.update({ status });
    return booking;
};

// Cancel booking
export const cancelBookingService = async (id) => {
    const booking = await Booking.findByPk(id);
    if (!booking) throw { status: 404, message: 'Booking not found' };
    if (booking.status === 'checked_in') throw { status: 400, message: 'Cannot cancel an active booking' };
    await booking.update({ status: 'cancelled' });
    await Room.update({ status: 'available' }, { where: { id: booking.roomId } });
    return booking;
};
