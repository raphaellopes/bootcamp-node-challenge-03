// vendors
const express = require('express');

// local
const routes = require('./routes');

class App {
  constructor () {
    this.express = express();
    this.isDev = process.env.NODE_ENV || true;

    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.express.use(express.json());
  }

  routes () {
    this.express.use(routes);
  }
}

module.exports = new App().express;
