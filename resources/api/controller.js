const model = require('./model');
const method = require('./methods');
const validationError = require('../error/validationError');
const rocketchatError = require('../error/rocketchatError');




async function createUser(req, res, next) {

    let validateParams = '';
    try {
        validateParams = await model.schema.validateAsync(req.body);
    } catch (error) {
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

function registerRocketChat(req, res) {

    var name = req.body.name;
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