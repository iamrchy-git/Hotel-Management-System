import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/index.js';

const Guest = sequelize.define('Guest', {
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
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idProofType: {
        type: DataTypes.ENUM('passport', 'national_id', 'driving_license'),
        allowNull: true,
    },
    idProofNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
    },
}, {
    tableName: 'guests',
    timestamps: true,
});

export default Guest;
