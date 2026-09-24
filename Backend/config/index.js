import sequelize from '../config/connection.js';

// Import all models
import User from '../features/users/user.model.js';
import Guest from '../features/guest/guest.model.js';
import Room from '../features/rooms/room.model.js';
import Booking from '../features/bookings/booking.model.js';
import Payment from '../features/payment/payment.model.js';
import Feedback from '../features/feedback/feedback.model.js';
import Receptionist from '../features/receptionist/receptionist.model.js';
import Admin from '../features/admin/admin.model.js';
import Housekeeping from '../features/housekeeping/housekeeping.model.js';
import Manager from '../features/manager/manager.model.js';

// ========== USER ASSOCIATIONS ==========
User.hasOne(Guest,        { foreignKey: 'userId', onDelete: 'CASCADE' });
Guest.belongsTo(User,     { foreignKey: 'userId' });

User.hasOne(Receptionist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Receptionist.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Admin,        { foreignKey: 'userId', onDelete: 'CASCADE' });
Admin.belongsTo(User,     { foreignKey: 'userId' });

User.hasOne(Manager,      { foreignKey: 'userId', onDelete: 'CASCADE' });
Manager.belongsTo(User,   { foreignKey: 'userId' });

// ========== BOOKING ASSOCIATIONS ==========
Guest.hasMany(Booking,    { foreignKey: 'guestId', onDelete: 'CASCADE' });
Booking.belongsTo(Guest,  { foreignKey: 'guestId' });

Room.hasMany(Booking,     { foreignKey: 'roomId', onDelete: 'CASCADE' });
Booking.belongsTo(Room,   { foreignKey: 'roomId' });

// ========== PAYMENT ASSOCIATIONS ==========
Booking.hasOne(Payment,   { foreignKey: 'bookingId', onDelete: 'CASCADE' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId' });

// ========== FEEDBACK ASSOCIATIONS ==========
Guest.hasMany(Feedback,   { foreignKey: 'guestId', onDelete: 'CASCADE' });
Feedback.belongsTo(Guest, { foreignKey: 'guestId' });

Booking.hasOne(Feedback,  { foreignKey: 'bookingId', onDelete: 'SET NULL' });
Feedback.belongsTo(Booking, { foreignKey: 'bookingId' });

// ========== HOUSEKEEPING ASSOCIATIONS ==========
Room.hasMany(Housekeeping, { foreignKey: 'roomId', onDelete: 'CASCADE' });
Housekeeping.belongsTo(Room, { foreignKey: 'roomId' });

User.hasMany(Housekeeping, { foreignKey: 'userId', onDelete: 'CASCADE' });
Housekeeping.belongsTo(User, { foreignKey: 'userId' });

// ========== DB CONNECT & SYNC ==========
const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await sequelize.sync({ 
            alter: false 
        });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export { connectionDB, sequelize };