import * as managerService from './manager.service.js';

// GET /api/manager/reports/bookings
export const getBookingReport = async (req, res) => {
    try {
        const report = await managerService.generateBookingReportService();
        return res.status(200).json({ success: true, data: { report } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/manager/reports/revenue
export const getRevenueReport = async (req, res) => {
    try {
        const report = await managerService.generateRevenueReportService();
        return res.status(200).json({ success: true, data: { report } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/manager/reports/occupancy
export const getOccupancyReport = async (req, res) => {
    try {
        const report = await managerService.generateOccupancyReportService();
        return res.status(200).json({ success: true, data: { report } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/manager/reports/feedback
export const getFeedbackReport = async (req, res) => {
    try {
        const report = await managerService.generateFeedbackReportService();
        return res.status(200).json({ success: true, data: { report } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
