const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://username:password@localhost:5432/db_name', {logging: false});
