const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://postgres:seventyfour@localhost:5432/sport_db', {logging: false});