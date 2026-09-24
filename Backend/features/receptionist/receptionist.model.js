import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Receptionist = sequelize.define('Receptionist', {
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
    shift: {
        type: DataTypes.ENUM('morning', 'evening', 'night'),
        allowNull: true,
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: 'receptionists',
    timestamps: true,
});

export default Receptionist;
