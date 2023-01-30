const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { transfersRouter } = require('../routes/transfers.routes');
const { db } = require('../Database/db');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      users: '/api/v1/users',
      tranfers: '/api/v1/transfers',
    };
    this.database();
    this.middlewares();

    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    //cors sirve como una manera segurirdad superficial que me permite o deniega acceso a mi servidor
    this.app.use(cors());
    //json me  permite que el req venga json
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.tranfers, transfersRouter);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
