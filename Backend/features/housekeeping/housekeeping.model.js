import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Housekeeping = sequelize.define('Housekeeping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // FK -> users.id
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // FK -> rooms.id
    },
    taskType: {
        type: DataTypes.ENUM('cleaning', 'maintenance', 'inspection'),
        defaultValue: 'cleaning',
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending',
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    assignedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'housekeeping',
    timestamps: true,
});

export default Housekeeping;
