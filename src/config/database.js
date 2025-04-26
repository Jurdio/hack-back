const { Sequelize } = require('sequelize');
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = require('./env');

// Ініціалізація підключення до PostgreSQL через Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT || 5432, // дефолтний порт для PostgreSQL
    dialect: 'postgres',
    logging: false, // вимикаємо SQL-логи в консолі (можна true якщо треба дебажити)
    define: {
        freezeTableName: true, // таблиці будуть створюватися без автоматичного додавання "s" на кінці
        timestamps: true,      // автоматично додає createdAt / updatedAt
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = sequelize;
