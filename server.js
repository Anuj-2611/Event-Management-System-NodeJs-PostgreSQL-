const express = require('express');
const session = require('express-session');
const authRoutes = require('./app/routes/auth.routes.js');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000
    }
})); 

(async () => {
    const sequelize = require('./app/config/dataBase.js');
    const db = require('./app/models/index.js');
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        console.log(db.User);
        await db.sequelize.sync();
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
