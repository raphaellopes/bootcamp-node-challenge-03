const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ data: 'Salve' }));

module.exports = routes;
