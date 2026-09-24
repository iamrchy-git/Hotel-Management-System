import Booking from '../bookings/booking.model.js';
import Payment from '../payment/payment.model.js';
import Room from '../rooms/room.model.js';
import User from '../users/user.model.js';
import Feedback from '../feedback/feedback.model.js';
import { sequelize } from '../../config/index.js';

// Generate Reports (Generate Reports use case)
export const generateBookingReportService = async () => {
    const totalBookings = await Booking.count();
    const confirmedBookings = await Booking.count({ where: { status: 'confirmed' } });
    const checkedInBookings = await Booking.count({ where: { status: 'checked_in' } });
    const cancelledBookings = await Booking.count({ where: { status: 'cancelled' } });
    return { totalBookings, confirmedBookings, checkedInBookings, cancelledBookings };
};

export const generateRevenueReportService = async () => {
    const totalRevenue = await Payment.sum('amount', { where: { status: 'completed' } });
    const totalPayments = await Payment.count({ where: { status: 'completed' } });
    return { totalRevenue: totalRevenue || 0, totalPayments };
};

export const generateOccupancyReportService = async () => {
    const totalRooms = await Room.count();
    const occupiedRooms = await Room.count({ where: { status: 'occupied' } });
    const availableRooms = await Room.count({ where: { status: 'available' } });
    const occupancyRate = totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(2) : 0;
    return { totalRooms, occupiedRooms, availableRooms, occupancyRate: `${occupancyRate}%` };
};

export const generateFeedbackReportService = async () => {
    const totalFeedback = await Feedback.count();
    const avgRating = await Feedback.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
        raw: true,
    });
    return { totalFeedback, avgRating: parseFloat(avgRating?.avgRating || 0).toFixed(2) };
};
