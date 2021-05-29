const Joi = require('joi');
const model = require('./model');
const method = require('./methods');
const validationError = require('../error/validationError');
const rocketchatError = require('../error/rocketchatError');




async function createUser(req, res, next) {

    let validateParams = ''; //= model.schema.validate(req.body); //validação do corpo do request
    try {
        validateParams = await model.schema.validateAsync(req.body);
    } catch (error) {

        /* if (error) {
            if (((error.details[0].message).toString() == ("\"active\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo active'))
                return;
            } else if (((error.details[0].message).toString() == ("\"joinDefaultChannels\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo joinDefaultChannels'))
                return;

            } else if (((error.details[0].message).toString() == ("\"requirePasswordChange\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest("Esperado valor boolean no campo requirePasswordChange"))
                return;

            } else if (((error.details[0].message).toString() == ("\"verified\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo verified'))
                return;

            } else if (((error.details[0].message).toString() == ("\"sendWelcomeEmail\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo sendWelcomeEmail'))
                return;

            } else if ((error.details[0].message).toString() == ("\"name\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo nome'));
                return;
            } else if ((error.details[0].message).toString() == ("\"email\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo email'));
                return;
            } else if ((error.details[0].message).toString() == ("\"username\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo username'));
                return;
            } else if ((error.details[0].message).toString() == ("\"password\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo password'));
                return;
            } else {

                next(validationError.badRequest(error.details[0].message.toString()))
                return;

            }
        } */
        // console.log(error)
        return next(validationError.badRequest(error.message));
    }



    try {
        const result = await method.apicreateuser(validateParams);
        //console.log(result)
        return res.status(201).end(JSON.stringify(result.data));
    } catch (Error) {
        //console.log(Error)
        if (Error.code == 400) {
            return next(rocketchatError.badRequest(Error.message));
        } else if (Error.code == 406) {
            return next(rocketchatError.notAcceptable(Error.message));
        } else if (Error.code == 409) {
            return next(rocketchatError.conflict(Error.message));
        } else if (Error.code == 500) {
            return next(rocketchatError.internal(Error.message));
        } else {
            return res.status(400).end("Something Went Wrong")
        }

    }


};

function registerRocketChat(req, res) { //route de submeter o form

    var name = req.body.name; //variaveis do form
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.pass;
    var passconf = req.body.passconf;


    if (name != "" && username != "" && email != "" && pass != "" && pass == passconf) { //se tudo estiver preenchido e confirmação da password estar correta
        method.registerUser(res, name, username, email, pass); //tenta registar utilizador com função registerUser
    } else
    if (name == "") { //se houver algum campo do form em falta
        res.render('userform', { //faz rendering do form com mensagem que o form estava incompleto 
            message: "Falta introduzir o nome!"
        });
    }
    //Adicionei algumas opções mais dignas de front-end para ser mais fácil para o tester
    else if (username == "") {
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

function renderForm(req, res) { //route inicial

    res.render('userform', { //rendering do form sem mensagem                                   
        message: ''
    });

}

module.exports = {
    createUser,
    registerRocketChat,
    renderForm,


};