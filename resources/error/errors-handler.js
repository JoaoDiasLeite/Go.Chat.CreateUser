const validationError = require('./validationError');
const rocketchatError = require('./rocketchatError');

function ErrorsHandler(err, req, res, next) {

    //console.error(err);

    if (err instanceof validationError) {
        res.status(err.code).end(err.message);
        return;
    }
    if (err instanceof rocketchatError) {
        res.status(err.code).end(err.message);
        return;
    }


    res.status(500).json('Something went wrong')
}

module.exports = ErrorsHandler;