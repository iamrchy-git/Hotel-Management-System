import * as bookingService from './booking.service.js';

// POST /api/bookings  - Make Booking
export const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBookingService(req.user.id, req.body);
        return res.status(201).json({ success: true, message: 'Booking created successfully', data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/bookings  - All Bookings (Admin/Receptionist)
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookingsService();
        return res.status(200).json({ success: true, data: { bookings } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/bookings/my-bookings  - View Booking (Guest)
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingsByGuestService(req.user.id);
        return res.status(200).json({ success: true, data: { bookings } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingByIdService(req.params.id);
        return res.status(200).json({ success: true, data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// PUT /api/bookings/:id/status  - Update Booking Status
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await bookingService.updateBookingStatusService(req.params.id, status);
        return res.status(200).json({ success: true, message: 'Booking status updated', data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// DELETE /api/bookings/:id  - Cancel Booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBookingService(req.params.id);
        return res.status(200).json({ success: true, message: 'Booking cancelled', data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
