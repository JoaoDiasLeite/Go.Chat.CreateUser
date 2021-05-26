const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const bodyParser = require('body-parser');
const Joi = require('joi');
const routes = require('./routes');

const { response } = require('express');

const validationErrorHandler = require('./resources/error/validation-error-handling')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', routes);

app.use(function(req, res) {
    const err = "404 Route Not Found";

    res.status(404).end(err);
});
app.use(validationErrorHandler);
const port = process.env.PORT || 3002;
app.listen(port, function() { //server está a correr no port 3002       
    console.log(`Running on port ${port}`);
});
module.exports = app;