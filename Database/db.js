const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT, //es el motor de base de datos con el cual voy a trabajar
  host: process.env.DB_HOST, //direccion del servidor
  username: process.env.DB_USERNAME, //por defecto es 'postgres'
  password: process.env.DB_PASSWORD, //contraseña que tengo en pgAdmin
  database: process.env.DB_DATABASE, //nombre de la base datos de la carpeta que cree en pgAdmin
  logging: false,
});

module.exports = { db };
