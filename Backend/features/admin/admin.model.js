import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Admin = sequelize.define('Admin', {
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
        defaultValue: 'General',
    },
}, {
    tableName: 'admins',
    timestamps: true,
});

export default Admin;
