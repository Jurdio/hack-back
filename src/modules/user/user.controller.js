const User = require('./user.model');
const { uploadFile } = require('../../common/services/s3.service');
const ApiError = require('../../common/exceptions/ApiError');

const uploadAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw ApiError.badRequest('No file uploaded');
        }

        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        const fileUrl = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);

        user.avatar = fileUrl;
        await user.save();

        res.json({ message: 'Avatar uploaded successfully', avatar: fileUrl });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadAvatar,
};
