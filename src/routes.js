// vendors
const express = require('express');

// locals
const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Ads
routes.use(authMiddleware);
routes.get('/ads', AdController.index);
routes.get('/ads/:id', AdController.show);
routes.post('/ads', AdController.store);
routes.put('/ads/:id', AdController.update);
routes.delete('/ads/:id', AdController.destroy);

// Purchases
routes.post('/purchases', PurchaseController.store);

module.exports = routes;
