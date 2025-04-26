const app = require('./src/config/app');
const { PORT } = require('./src/config/env');
const sequelize = require('./src/config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
