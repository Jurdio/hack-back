const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const ApiError = require('../common/exceptions/ApiError');
const authMiddleware = require('../common/middlewares/auth.middleware');
const userRoutes = require('../modules/user/user.routes');
const grantRoutes = require('../modules/grant/grant.routes');
const grantApplicationRoutes = require('../modules/grantApplication/grantApplication.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/user', userRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/grant-applications', grantApplicationRoutes);

// Обробка помилок
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
