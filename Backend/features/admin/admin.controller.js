import * as adminService from './admin.service.js';

// GET /api/admin/users  - Manage Users
export const manageUsers = async (req, res) => {
    try {
        const users = await adminService.manageUsersService();
        return res.status(200).json({
             success: true,
              data: { users } 
            });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message
         });
    }
};

// PUT /api/admin/users/:id/role
export const updateUserRole = async (req, res) => {
    try {
        const { roles } = req.body;
        const user = await adminService.updateUserRoleService(req.params.id, roles);
        return res.status(200).json({ 
            success: true, 
            message: 'User role updated',
             data: { user } 
            });
    } catch (error) {
        return res.status(error.status || 500).json({
             success: false,
              message: error.message 
            });
    }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
    try {
        await adminService.deleteUserByAdminService(req.params.id);
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

// GET /api/admin/bookings  - Manage Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await adminService.getAllBookingsByAdminService();
        return res.status(200).json({ 
            success: true, 
            data: { bookings } });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message });
    }
};
