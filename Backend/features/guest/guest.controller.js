import * as guestService from './guest.service.js';

// POST /api/guests  - Create guest profile
export const createGuest = async (req, res) => {
    try {
        const guest = await guestService.createGuestService(req.user.id, req.body);
        return res.status(201).json({ success: true, message: 'Guest profile created', data: { guest } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/guests
export const getAllGuests = async (req, res) => {
    try {
        const guests = await guestService.getAllGuestsService();
        return res.status(200).json({ success: true, data: { guests } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/guests/my-profile
export const getMyProfile = async (req, res) => {
    try {
        const guest = await guestService.getGuestByUserIdService(req.user.id);
        return res.status(200).json({ success: true, data: { guest } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/guests/:id
export const getGuestById = async (req, res) => {
    try {
        const guest = await guestService.getGuestByIdService(req.params.id);
        return res.status(200).json({ success: true, data: { guest } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// PUT /api/guests/:id
export const updateGuest = async (req, res) => {
    try {
        const guest = await guestService.updateGuestService(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Guest updated', data: { guest } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
