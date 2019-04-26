// vendors
const express = require('express');
const mongoose = require('mongoose');
const databaseConfig = require('./config/database');
const validate = require('express-validation');
const Youch = require('youch');

// local
const routes = require('./routes');

class App {
  constructor () {
    this.express = express();
    this.isDev = process.env.NODE_ENV || true;

    this.database();
    this.middlewares();
    this.routes();

    // @NOTE: The exception needs to execute after routes settings
    this.exception();
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares () {
    this.express.use(express.json());
  }

  routes () {
    this.express.use(routes);
  }

  exception () {
    // @NOTE: When the middleware recieves four parameters, the first one
    // is the error
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);

        return res.json(await youch.toJSON());
      }

      return res.status(err.status || 500).json({
        error: 'Internal Server error'
      });
    });
  }
}

module.exports = new App().express;
