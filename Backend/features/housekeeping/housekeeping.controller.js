import * as housekeepingService from './housekeeping.service.js';

// POST /api/housekeeping
export const createTask = async (req, res) => {
    try {
        const task = await housekeepingService.createTaskService(req.body);
        return res.status(201).json({ success: true, message: 'Task created', data: { task } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/housekeeping
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await housekeepingService.getAllTasksService();
        return res.status(200).json({ success: true, data: { tasks } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/housekeeping/my-tasks
export const getMyTasks = async (req, res) => {
    try {
        const tasks = await housekeepingService.getMyTasksService(req.user.id);
        return res.status(200).json({ success: true, data: { tasks } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// PUT /api/housekeeping/:id/status
export const updateTaskStatus = async (req, res) => {
    try {
        const task = await housekeepingService.updateTaskStatusService(req.params.id, req.body.status);
        return res.status(200).json({ success: true, message: 'Task updated', data: { task } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
