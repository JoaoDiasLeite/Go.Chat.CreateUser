const Joi = require('joi');
const model = require('./model');
const method = require('./methods');
const validationError = require('../error/validationError')




async function createUser(req, res, next) { //route de submeter o form


    let result = ''; //= model.schema.validate(req.body); //validação do corpo do request
    try {
        result = await model.schema.validateAsync(req.body);
    } catch (error) {
        // log error


        if (result.error) {
            if (((result.error.details[0].message).toString() == ("\"active\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo active'))
                return;
            } else if (((result.error.details[0].message).toString() == ("\"joinDefaultChannels\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo joinDefaultChannels'))
                return;

            } else if (((result.error.details[0].message).toString() == ("\"requirePasswordChange\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest("Esperado valor boolean no campo requirePasswordChange"))
                return;

            } else if (((result.error.details[0].message).toString() == ("\"verified\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo verified'))
                return;

            } else if (((result.error.details[0].message).toString() == ("\"sendWelcomeEmail\" must be a boolean")) == true) { //se não for válido:
                next(validationError.badRequest('Esperado valor boolean no campo sendWelcomeEmail'))
                return;

            } else if ((result.error.details[0].message).toString() == ("\"name\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo nome'));
                return;
            } else if ((result.error.details[0].message).toString() == ("\"email\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo email'));
                return;
            } else if ((result.error.details[0].message).toString() == ("\"username\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo username'));
                return;
            } else if ((result.error.details[0].message).toString() == ("\"password\" is required") == true) {
                next(validationError.badRequest('É necessário preencher o campo password'));
                return;
            } else {
                console.log(result.error);
                next(validationError.badRequest())
                return;

            }
        }
        next(error);
    }
    try {
        method.apicreateuser(res, req, next);
    } catch (error) {
        return res.status(500).end("RocketChat não se econtra ligado");

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