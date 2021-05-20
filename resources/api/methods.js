const Joi = require('joi');
const axios = require('axios');
const { response } = require('express');

async function apicreateuser(res, req) { //função assincrona para registar utilizador no Rocketchat

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
                        'X-Auth-Token': 'DpTop-NOTDK5o7aa0rCyLO2wWu_ljI2VQQeSpAgbU70',
                        'X-User-Id': 'Ln68H7iXyLbGQTDnJ',


                    }
                })
            .catch(
                function(error) {
                    return Promise.reject(error);
                }
            );

        res.end(JSON.stringify(response.data));

    } catch (error) {

        if ((error.response.data.error).toString().startsWith(req.body.username) == true) {
            console.log(error.response.data.error)
            return res.status(401).end("Nome de utilizador já se encontra em utilização!");
        } else if ((error.response.data.error).toString().startsWith("Invalid email") == true) {
            console.log(error.response.data.error)
            return res.status(error.response.status).end("Email inváildo!");
        } else if ((error.response.data.error).toString().startsWith(req.body.email) == true) {
            console.log(error.response.data.error)
            return res.status(401).end("Email já se encontra em utilização!");
        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field verified") == true) {
            console.log(error.response.data.error)
            return res.status(406).end("Esperado valor boolean no campo \"verified\".");
        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field active") == true) {
            console.log(error.response.data.error)
            return res.status(406).end("Esperado valor boolean no campo \"active\".");
        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field joinDefaultChannels") == true) {
            console.log(error.response.data.error)
            return res.status(406).end("Esperado valor boolean no campo \"joinDefaultChannels\".");
        } else if ((error.response.data.error).toString().startsWith("Match error: Expected boolean") && (error.response.data.error).toString().endsWith("in field sendWelcomeEmail") == true) {
            console.log(error.response.data.error)
            return res.status(406).end("Esperado valor boolean no campo \"sendWelcomeEmail\".");

        } else {
            //console.log(error)
            // console.log(error.response.data.error)
            //console.log(error.response.data.errorType)

            return res.status(error.response.status).end(JSON.stringify(error.response.data.error));
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