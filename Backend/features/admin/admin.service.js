import User from '../users/user.model.js';
import Room from '../rooms/room.model.js';
import Booking from '../bookings/booking.model.js';

// Manage Users - Get all
export const manageUsersService = async () => {
    return await User.findAll({ attributes: { exclude: ['password', 'refreshToken'] } });
};

// Manage Users - Update role
export const updateUserRoleService = async (id, roles) => {
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: 'User not found' };
    await user.update({ roles });
    return user;
};

// Manage Users - Delete
export const deleteUserByAdminService = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: 'User not found' };
    await user.destroy();
    return true;
};

// Manage Rooms (Admin delegating to room service) - already done in rooms feature
// Manage Bookings - Admin can see all
export const getAllBookingsByAdminService = async () => {
    return await Booking.findAll({ include: [{ model: Room }] });
};
