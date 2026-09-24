import Housekeeping from './housekeeping.model.js';
import Room from '../rooms/room.model.js';

// Create housekeeping task
export const createTaskService = async (data) => {
    const { userId, roomId, taskType, notes } = data;
    if (!userId || !roomId) throw { status: 400, message: 'userId and roomId are required' };
    const room = await Room.findByPk(roomId);
    if (!room) throw { status: 404, message: 'Room not found' };
    return await Housekeeping.create({ userId, roomId, taskType, notes });
};

// Get all tasks
export const getAllTasksService = async () => {
    return await Housekeeping.findAll({ include: [{ model: Room }] });
};

// Get tasks by staff (userId)
export const getMyTasksService = async (userId) => {
    return await Housekeeping.findAll({ where: { userId }, include: [{ model: Room }] });
};

// Update task status
export const updateTaskStatusService = async (id, status) => {
    const task = await Housekeeping.findByPk(id);
    if (!task) throw { status: 404, message: 'Task not found' };
    await task.update({ status });
    // If completed, make room available
    if (status === 'completed') {
        await Room.update({ status: 'available' }, { where: { id: task.roomId } });
    }
    return task;
};
