import Room from './room.model.js';

// Create room
export const createRoomService = async (data) => {
    const existing = await Room.findOne({ where: { roomNumber: data.roomNumber } });
    if (existing) throw { status: 400, message: 'Room number already exists' };
    const room = await Room.create(data);
    return room;
};

// Get all rooms
export const getAllRoomsService = async () => {
    return await Room.findAll();
};

// Get available rooms
export const getAvailableRoomsService = async () => {
    return await Room.findAll({ where: { status: 'available' } });
};

// Get room by ID
export const getRoomByIdService = async (id) => {
    const room = await Room.findByPk(id);
    if (!room) throw { status: 404, message: 'Room not found' };
    return room;
};

// Update room
export const updateRoomService = async (id, data) => {
    const room = await Room.findByPk(id);
    if (!room) throw { status: 404, message: 'Room not found' };
    await room.update(data);
    return room;
};

// Delete room
export const deleteRoomService = async (id) => {
    const room = await Room.findByPk(id);
    if (!room) throw { status: 404, message: 'Room not found' };
    await room.destroy();
    return true;
};
