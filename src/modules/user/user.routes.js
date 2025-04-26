const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../common/middlewares/auth.middleware');
const upload = require('../../common/middlewares/upload.middleware');

// Оновити аватар користувача
router.post(
    '/upload-avatar',
    authMiddleware,
    upload.single('avatar'),
    userController.uploadAvatar
);

module.exports = router;
