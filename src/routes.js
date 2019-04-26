// vendors
const express = require('express');
const validate = require('express-validation');

// locals
const validators = require('./app/validators');
const controllers = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
);
routes.post(
  '/sessions',
  validate(validators.User),
  controllers.SessionController.store
);

// Ads
routes.use(authMiddleware);
routes.get('/ads', controllers.AdController.index);
routes.get('/ads/:id', controllers.AdController.show);
routes.post(
  '/ads',
  validate(validators.Ad),
  controllers.AdController.store
);
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  controllers.AdController.update
);
routes.delete('/ads/:id', controllers.AdController.destroy);

// Purchases
routes.post(
  '/purchases',
  validate(validators.Purchase),
  controllers.PurchaseController.store
);

module.exports = routes;
