import * as paymentService from './payment.service.js';

// POST /api/payments  - Make Payment
export const makePayment = async (req, res) => {
    try {
        const payment = await paymentService.makePaymentService(req.body);
        return res.status(201).json({ success: true, message: 'Payment successful', data: { payment } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPaymentsService();
        return res.status(200).json({ success: true, data: { payments } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/payments/booking/:bookingId
export const getPaymentByBooking = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentByBookingService(req.params.bookingId);
        return res.status(200).json({ success: true, data: { payment } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
