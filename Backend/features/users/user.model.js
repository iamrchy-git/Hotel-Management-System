import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';
import bcrypt from 'bcrypt';



const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    roles: {
        type: DataTypes.ENUM('admin', 'guest', 'receptionist', 'housekeeping', 'manager'),
        defaultValue: 'guest',
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

export default User;