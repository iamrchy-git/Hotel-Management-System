import * as roomService from './room.service.js';

// POST /api/rooms
export const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoomService(req.body);
        return res.status(201).json({ success: true, message: 'Room created successfully', data: { room } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
    }
};

// GET /api/rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRoomsService();
        return res.status(200).json({ success: true, data: { rooms } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/rooms/available  (Search Request use case)
export const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAvailableRoomsService();
        return res.status(200).json({ success: true, data: { rooms } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/rooms/:id
export const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomByIdService(req.params.id);
        return res.status(200).json({ success: true, data: { room } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// PUT /api/rooms/:id
export const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoomService(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Room updated successfully', data: { room } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoomService(req.params.id);
        return res.status(200).json({ success: true, message: 'Room deleted successfully' });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
