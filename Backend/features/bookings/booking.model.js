import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // FK -> guests.id
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // FK -> rooms.id
    },
    checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    numberOfGuests: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'),
        defaultValue: 'pending',
    },
    specialRequests: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'bookings',
    timestamps: true,
});

export default Booking;
