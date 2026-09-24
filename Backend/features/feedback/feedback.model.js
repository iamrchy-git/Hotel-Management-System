import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Feedback = sequelize.define('Feedback', {
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
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // FK -> bookings.id
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'feedback',
    timestamps: true,
});

export default Feedback;
