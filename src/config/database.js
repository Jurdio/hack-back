const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./env');

// Ініціалізація підключення через URI
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
    }
});

module.exports = sequelize;
