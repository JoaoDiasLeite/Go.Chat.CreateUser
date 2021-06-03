const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

const routes = require('./routes');
const ErrorsHandler = require('./utils/error/errors-handler');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/gochat', routes);

app.use(function(req, res) {
    const err = "404 Route Not Found";

    res.status(404).end(err);
});
app.use(ErrorsHandler);
const port = process.env.PORT || 3002;
app.listen(port, function() {
    console.log(`Running on port ${port}`);
});
module.exports = app;