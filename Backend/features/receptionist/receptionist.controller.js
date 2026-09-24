import * as receptionistService from './receptionist.service.js';

// POST /api/receptionists
export const createReceptionist = async (req, res) => {
    try {
        const receptionist = await receptionistService.createReceptionistService(req.user.id, req.body);
        return res.status(201).json({ success: true, message: 'Receptionist profile created', data: { receptionist } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/receptionists
export const getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await receptionistService.getAllReceptionistsService();
        return res.status(200).json({ success: true, data: { receptionists } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/receptionists/checkin/:bookingId  - Check-in use case
export const checkIn = async (req, res) => {
    try {
        const booking = await receptionistService.checkInService(req.params.bookingId);
        return res.status(200).json({ success: true, message: 'Check-in successful', data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// POST /api/receptionists/checkout/:bookingId  - Check-out use case
export const checkOut = async (req, res) => {
    try {
        const booking = await receptionistService.checkOutService(req.params.bookingId);
        return res.status(200).json({ success: true, message: 'Check-out successful', data: { booking } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
