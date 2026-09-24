import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.ENUM('single', 'double', 'suite', 'deluxe'),
        allowNull: false,
    },
    pricePerNight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'booked', 'occupied', 'maintenance'),
        defaultValue: 'available',
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    amenities: {
        type: DataTypes.JSON,
        defaultValue: [],
        // e.g. ['WiFi', 'AC', 'TV', 'Mini Bar']
    },
}, {
    tableName: 'rooms',
    timestamps: true,
});

export default Room;
