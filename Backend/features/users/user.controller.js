import * as userService from './user.service.js';
import jwt from 'jsonwebtoken';

// GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;


        const users = await userService.getAllUsersService();
        return res.status(200).json({ success: true, data: { users } });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.params.id);
        return res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUserService(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: {
                user
            }
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserService(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};