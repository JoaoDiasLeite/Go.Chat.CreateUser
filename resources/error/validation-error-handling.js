const validationError = require('./validationError');

function validationErrorHandler(err, req, res, next) {

    console.error(err);

    if (err instanceof validationError) {
        res.status(err.code).json(err.message);
        return;
    }


    res.status(500).json('Something went wrong')
}

module.exports = validationErrorHandler;