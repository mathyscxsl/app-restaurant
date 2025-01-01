const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Dish = require('./Dish');

const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
Restaurant.hasMany(Dish, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Restaurant;