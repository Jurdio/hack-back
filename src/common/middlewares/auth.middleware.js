const { verifyToken } = require('../utils/jwt');
const ApiError = require('../exceptions/ApiError');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new ApiError(401, 'No token provided'));
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid token'));
    }
};

module.exports = authMiddleware;
