const User = require('../user/user.model');
const { hashPassword, comparePassword } = require('../../common/utils/password');
const { generateToken } = require('../../common/utils/jwt');
const ApiError = require('../../common/exceptions/ApiError');

const register = async ({ email, password, confirmPassword }) => {
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
        throw new ApiError(400, 'User with this email already exists');
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match');
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    const token = generateToken({ id: user.id, email: user.email });

    return { token };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { token };
};

module.exports = {
    register,
    login,
};
