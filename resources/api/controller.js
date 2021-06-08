const model = require('./model');
const method = require('./methods');
const validationError = require('../../utils/error/validationError');
const rocketchatError = require('../../utils/error/rocketchatError');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns response and status
 */
async function createUser(req, res, next) {

    let validateParams = '';
    try {
        validateParams = await model.schema.validateAsync(req.body);
    } catch (error) {
        return next(validationError.badRequest(error.message));
    }
    try {
        const result = await method.apicreateuser(validateParams);

        return res.status(201).end(JSON.stringify(result.data));
    } catch (Error) {

        if (Error.code == 400) {
            return next(rocketchatError.badRequest(Error.message));

        } else if (Error.code == 406) {
            return next(rocketchatError.notAcceptable(Error.message));

        } else if (Error.code == 409) {
            return next(rocketchatError.conflict(Error.message));

        } else if (Error.code == 500) {
            return next(rocketchatError.internal(Error.message));

        } else {
            return res.status(500).end("Something Went Wrong")
        }
    }
};

function registerRocketChat(req, res) {

    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.pass;
    var passconf = req.body.passconf;


    if (name != "" && username != "" && email != "" && pass != "" && pass == passconf) {
        method.registerUser(res, name, username, email, pass);
    } else
    if (name == "") {
        res.render('userform', {
            message: "Falta introduzir o nome!"
        });
    } else if (username == "") {
        res.render('userform', {
            message: "Falta introduzir o nome de Utilizador!"
        });
    } else if (email == "") {
        res.render('userform', {
            message: "Falta introduzir o seu email!"
        });
    } else if (pass == "") {
        res.render('userform', {
            message: "Falta introduzir a palavra-passe!"
        });
    } else if (passconf == "") {
        res.render('userform', {
            message: "Falta verificar a sua palavra-passe!"
        });
    } else if (pass != passconf) {
        res.render('userform', {
            message: "Palavras-passe não coicidem!"
        });
    } else {
        res.render('userform', {
            message: "Formulário inválido!"
        });
    }
};

function renderForm(req, res) {

    res.render('userform', {
        message: ''
    });

}

module.exports = {
    createUser,
    registerRocketChat,
    renderForm,


};