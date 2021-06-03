const axios = require('axios');
require('dotenv').config();
const rocketchatError = require('../../utils/error/rocketchatError');

let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;

/**
 * Async function that creates a user in Rocket.Chat
 * @param {Object} userData
 *  
 * @returns {Object}
 */
async function apicreateuser(userData) {
    let response = '';

    try {
        response = await axios.post('http://localhost:3000/api/v1/users.create',
            userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': `${auth_token}`,
                    'X-User-Id': `${user_id}`,
                }
            })

    } catch (error) {

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
async function registerUser(res, name, username, email, pass) {

    try {
        let response = await axios.post('http://localhost:3000/api/v1/users.register', {
                "username": username,
                "email": email,
                "pass": pass,
                "name": name
            }, {
                headers: {
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
            message: "Utilizador " + data.user.username + " criado com sucesso."
        });

    } catch (error) {
        res.render('userform', {
            message: "Erro ao criar o utilizador!"

        });
    }

}

module.exports = {
    apicreateuser,
    registerUser,

}