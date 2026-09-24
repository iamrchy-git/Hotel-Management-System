import Payment from './payment.model.js';
import Booking from '../bookings/booking.model.js';

// Make Payment
export const makePaymentService = async (data) => {
    const { bookingId, amount, method } = data;
    if (!bookingId || !amount || !method) {
        throw { status: 400, message: 'bookingId, amount, and method are required' };
    }
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw { status: 404, message: 'Booking not found' };

    const payment = await Payment.create({
        bookingId,
        amount,
        method,
        status: 'completed',
        paidAt: new Date(),
    });
    return payment;
};

// Get all payments
export const getAllPaymentsService = async () => {
    return await Payment.findAll({ include: [{ model: Booking }] });
};

// Get payment by booking ID
export const getPaymentByBookingService = async (bookingId) => {
    const payment = await Payment.findOne({ where: { bookingId } });
    if (!payment) throw { status: 404, message: 'Payment not found for this booking' };
    return payment;
};
