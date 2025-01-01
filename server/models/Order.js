const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Dish = require('./Dish');

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.ENUM('pending', 'validated'),
        defaultValue: 'pending',
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

const OrderDish = sequelize.define('OrderDish', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsToMany(Dish, { through: OrderDish, foreignKey: 'orderId' });
Dish.belongsToMany(Order, { through: OrderDish, foreignKey: 'dishId' });

module.exports = { Order, OrderDish };