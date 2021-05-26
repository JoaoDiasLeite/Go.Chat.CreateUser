const Joi = require('joi');
const axios = require('axios');
const { response } = require('express');
const settings = require('../settings');
const model = require('./model');
require('dotenv').config();
const validationError = require('../error/validationError')


let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;

async function apicreateuser(res, req, next) { //função assincrona para registar utilizador no Rocketchat

    try {
        let response = await axios.post('http://localhost:3000/api/v1/users.create', //post para rocketchat api/v1/users.register
                {
                    "username": req.body.username, //json dos parametros do utilizador para registar
                    "email": req.body.email,
                    "password": req.body.password,
                    "name": req.body.name,
                    "roles": req.body.roles,
                    "active": req.body.active,
                    "joinDefaultChannels": req.body.joinDefaultChannels,
                    "requirePasswordChange": req.body.requirePasswordChange,
                    "sendWelcomeEmail": req.body.sendWelcomeEmail,
                    "verified": req.body.verified,
                    "customFields": req.body.customFields,
                    //"domain_uuid": stringify(uuidv4())

                }, {
                    headers: { //header com conteudo application/json para poder fazer post de json
                        'Content-Type': 'application/json',
                        //Criar Token Pessoal na conta de administrador  em Account -> Tokens
                        'X-Auth-Token': `${auth_token}`,
                        'X-User-Id': `${user_id}`,


                    }
                })
            /*  .catch(
                 function(error) {

                     return Promise.reject(error);

                 }
             ); */

        res.status(201).end(JSON.stringify(response.data));

    } catch (error) {

        if (error.code == "ECONNREFUSED") {
            next(validationError.internal('Nome de utilizador já se encontra em utilização!'))
            return;


        } else if ((error.response.data.error) == undefined) {
            next(validationError.notAcceptable('Credencias necessárias'))
            return;

        } else if ((error.response.data.error).toString().startsWith(req.body.username) == true) {
            next(validationError.conflict('Nome de utilizador já se encontra em utilização!'))
            return;

        } else if ((error.response.data.error).toString().startsWith("Invalid email") == true) {
            next(validationError.badRequest('Email inváildo!'))
            return;;
        } else if ((error.response.data.error).toString().startsWith(req.body.email) == true) {
            next(validationError.conflict('Email já se encontra em utilização!'))
            return;

        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field verified") == true) {
            next(validationError.badRequest('Esperado valor boolean no campo verified.'))
            return;

        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field active") == true) {
            next(validationError.badRequest('Esperado valor boolean no campo active'))
            return;

        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field joinDefaultChannels") == true) {
            next(validationError.badRequest('Esperado valor boolean no campo joinDefaultChannels.'))
            return;

        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field sendWelcomeEmail") == true) {
            next(validationError.badRequest('Esperado valor boolean no campo sendWelcomeEmail.'))
            return;
        } else {
            console.log(error)

            //console.log(error.response.data.errorType)
            next(validationError.badRequest(JSON.stringify(error.response.data.error)))
            return;

        }

    }
}
async function registerUser(res, name, username, email, pass) { //função assincrona para registar utilizador no Rocketchat

    try {
        let response = await axios.post('http://localhost:3000/api/v1/users.register', //post para rocketchat api/v1/users.register
                {
                    "username": username, //json dos parametros do utilizador para registar
                    "email": email,
                    "pass": pass,
                    "name": name
                }, {
                    headers: { //header com conteudo application/json para poder fazer post de json
                        'Content-Type': 'application/json'
                    }
                })
            .catch(
                function(error) {
                    return Promise.reject(error);
                }
            );


        let data = response.data;

        res.render('userform', {
            message: "Utilizador " + data.user.username + " criado com sucesso." //Pus os alertas em português visto que a empresa é portuguesa e não se seabe quem vai testar
        }); //render do Form com mensagem que o utilizador foi criado com sucesso 

    } catch (error) {
        res.render('userform', { //se acontecer um erro faz render com mensagem de erro
            message: "Erro ao criar o utilizador!" //Adicionei uma mensagem mas apropriada para front-end

        });
    }

}

module.exports = {
    apicreateuser,
    registerUser
}