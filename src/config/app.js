const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const ApiError = require('../common/exceptions/ApiError');
const authMiddleware = require('../common/middlewares/auth.middleware');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(authMiddleware);

// Обробка помилок
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
