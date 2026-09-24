import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        // FK -> users.id
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'managers',
    timestamps: true,
});

export default Manager;
