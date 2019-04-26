// vendors
const express = require('express');
const validate = require('express-validation');
const handle = require('express-async-handler');

// locals
const validators = require('./app/validators');
const controllers = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
);
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
);

// Ads
routes.use(authMiddleware);
routes.get('/ads', handle(controllers.AdController.index));
routes.get('/ads/:id', handle(controllers.AdController.show));
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
);
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
);
routes.delete('/ads/:id', handle(controllers.AdController.destroy));
routes.post(
  '/ads/:id/accept_buy',
  handle(controllers.AdController.accept_buy)
);

// Purchases
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
);

module.exports = routes;
