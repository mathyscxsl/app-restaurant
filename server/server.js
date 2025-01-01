const express = require('express');
const dotenv = require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Error connecting to the database:', err));

sequelize.sync({ force: true })
  .then(() => console.log('Database synced!'))
  .catch(err => console.error('Error syncing database:', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
