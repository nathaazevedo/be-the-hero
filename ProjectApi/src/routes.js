const express = require('express');

const UserController = require('../Controllers/UserController');
const IncidentController = require('../Controllers/IncidentController');
const SessionController = require('../Controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/incident', IncidentController.get);
routes.get('/myIncidents', IncidentController.getMyIncidents);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

routes.get('/', (request, response) => {
    return response.json({ test: "oi" });
});

module.exports = routes;