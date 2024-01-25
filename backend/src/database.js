const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
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
    coins: {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date_created: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = {
    sequelize: sequelize,
    Person: xama4ok
};
