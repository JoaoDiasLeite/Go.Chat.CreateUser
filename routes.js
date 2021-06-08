const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./docs/swagger/swagger.json')
const controller = require('./resources/api/controller')

//Base Registar
router.get('/register', controller.renderForm);
router.post('/register', controller.registerRocketChat)

//API
router.post('/users', controller.createUser);

//Swagger
router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

module.exports = router;