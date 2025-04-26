const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Grant = sequelize.define('Grant', {
    foundation_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foundation_logo: {
        type: DataTypes.STRING,
        allowNull: true, // бо може бути грант без логотипа
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cluster_name: {
        type: DataTypes.STRING,
        allowNull: true, // не завжди буває кластер, може бути пусто
    },
    budget: {
        type: DataTypes.STRING, // бо інколи бюджет пишуть словами "до 50 тис євро"
        allowNull: true,
    },
    realization_start: {
        type: DataTypes.DATE,
        allowNull: true, // може не бути точної дати
    },
    realization_end: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    application_deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    source_url: {
        type: DataTypes.STRING,
        allowNull: true, // звідки спарсено
    }
}, {
    tableName: 'grants',
    timestamps: true,
    freezeTableName: true, // не буде додавати 's' на кінці автоматично
});

module.exports = Grant;
