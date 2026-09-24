import Guest from './guest.model.js';
import User from '../users/user.model.js';

// Create guest profile
export const createGuestService = async (userId, data) => {
    const existing = await Guest.findOne({ where: { userId } });
    if (existing) throw { status: 400, message: 'Guest profile already exists for this user' };
    const guest = await Guest.create({ ...data, userId });
    return guest;
};

// Get all guests
export const getAllGuestsService = async () => {
    return await Guest.findAll({ include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }] });
};

// Get guest by ID
export const getGuestByIdService = async (id) => {
    const guest = await Guest.findByPk(id, { include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }] });
    if (!guest) throw { status: 404, message: 'Guest not found' };
    return guest;
};

// Get guest by userId
export const getGuestByUserIdService = async (userId) => {
    const guest = await Guest.findOne({ where: { userId }, include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }] });
    if (!guest) throw { status: 404, message: 'Guest profile not found' };
    return guest;
};

// Update guest
export const updateGuestService = async (id, data) => {
    const guest = await Guest.findByPk(id);
    if (!guest) throw { status: 404, message: 'Guest not found' };
    await guest.update(data);
    return guest;
};
