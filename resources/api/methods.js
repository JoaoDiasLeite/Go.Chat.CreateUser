const axios = require('axios');
require('dotenv').config();
const rocketchatError = require('../error/rocketchatError');


let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;

async function apicreateuser(userData) { //função assincrona para registar utilizador no Rocketchat
    let response = '';
    // console.log(userData);
    try {
        response = await axios.post('http://localhost:3000/api/v1/users.create',
            userData, {
                headers: { //header com conteudo application/json para poder fazer post de json
                    'Content-Type': 'application/json',
                    //Criar Token Pessoal na conta de administrador  em Account -> Tokens
                    'X-Auth-Token': `${auth_token}`,
                    'X-User-Id': `${user_id}`,
                }
            })

    } catch (error) {
        //console.log(error.response.data.error);
        if (error.code == "ECONNREFUSED") {
            throw new rocketchatError(500, 'Rocket.Chat Not Working');

        } else if ((error.response.data.error) == undefined) {
            throw new rocketchatError(406, 'Credenciais necessárias');


        } else if ((error.response.data.error).toString().startsWith(userData.username) == true) {
            throw new rocketchatError(409, 'Nome de utilizador já se encontra em utilização!');

        } else if ((error.response.data.error).toString().startsWith("Invalid email") == true) {
            throw new rocketchatError(400, 'Email inváildo!');

        } else if ((error.response.data.error).toString().startsWith(userData.email) == true) {
            throw new rocketchatError(409, 'Email já se encontra em utilização!');

        } else {
            throw new rocketchatError(400, JSON.stringify(error.response.data.error));

        }
    }
    return response;
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
    registerUser,

}