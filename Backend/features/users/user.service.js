import User from './user.model.js';

// Get all users
export const getAllUsersService = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password', 'refreshToken'] },
    });
    return users;
};

// Get user by ID
export const getUserByIdService = async (id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password', 'refreshToken'] },
    });
    if (!user) throw { 
        status: 404, 
        message: 'User not found' 
    };
    return user;
};

// Update user
export const updateUserService = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw {
        status: 404,
        message: 'User not found'
    };

    await user.update(data);
    const updated = user.toJSON();
    delete updated.password;
    return updated;
};

// Delete user
export const deleteUserService = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw {
        status: 404,
        message: 'User not found'
    };
    await user.destroy();
    return true;
};
