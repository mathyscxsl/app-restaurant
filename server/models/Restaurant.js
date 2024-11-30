const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Restaurant = sequelize.define('Restaurant', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Restaurant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Restaurant, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Restaurant;
