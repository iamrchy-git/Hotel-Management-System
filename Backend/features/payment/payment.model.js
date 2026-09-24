import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // FK -> bookings.id
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.ENUM('cash', 'card', 'online', 'bank_transfer'),
        defaultValue: 'cash',
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue: 'pending',
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'payments',
    timestamps: true,
});

export default Payment;
