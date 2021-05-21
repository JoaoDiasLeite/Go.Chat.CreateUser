const express = require('express');
const router = express.Router();


const controller = require('./resources/api/controller')


router.get('/', controller.renderForm);
router.post('/gochat/users', controller.createUser);
router.post('/', controller.registerRocketChat)


module.exports = router;