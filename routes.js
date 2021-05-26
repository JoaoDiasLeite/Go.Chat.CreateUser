const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json')
const controller = require('./resources/api/controller')

//Base Registar
router.get('/', controller.renderForm);
router.post('/', controller.registerRocketChat)

//API
router.post('/gochat/users', controller.createUser);


//Swagger
router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


module.exports = router;