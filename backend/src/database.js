const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || '5.35.89.195',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"
        }
    });

const xama4ok = sequelize.define('xama4ok', {
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    coins: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    crit_chance: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    crit_bonus: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = {
    sequelize: sequelize,
    Person: xama4ok
};
