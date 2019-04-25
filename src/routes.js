// vendors
const express = require('express');

// locals
const {
  UserController,
  SessionController
} = require('./app/controllers');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = routes;
