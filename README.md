# RegisterUserRocketchat
Aplicação de teste que interaje com a API do Rocketchat para registar um utilizador.

Como correr e utilizar a aplicação: 

-Instalar NodeJS 

-Instalar e correr RocketChat com a docuementação em https://confluence.go-contact.com/pages/viewpage.action?pageId=318210164 (Verificar RocketChat está a decorrer na Porta 3000);

-Aceder ao RocketChat em http://localhost:3000 e cofigurar admin se ainda não estiver configurado;

-Fazer clone da aplicação Go.Chat;

-Instalar packages com npm install e correr aplicação com nodemon app.js;

Registar um utilizador de forma convencional:

-Aceder a aplicação em http://localhost:3002, preencher e submeter o formulário para criar um novo utilizador -Verificar no RocketChat se o utilizador foi criado;

Em alternativa é possível utilizar um software como Postman ou Insomnia para criar utilizadores de uma forma mais completa para isso são necessários os seguintes passos:

-Após configurar a conta admin é necessário criar um token de acesso pessoal, para isso no Rocket.Chat ao aceder com a conta de administrador é necessário aceder a "Minha Conta" -> "Tokens de acesso pessoal" e criar um token;

-Após a criação do token pessoal é necessário guardar o token e o id fornecidos como X-Auth-Token (auth_token) e X-User-Id (user_id) respetivamente em "resources/settings.js";

-Através de um software como Insomnia ou Postman, fazer um POST no seguinte URL: "localhost:3002/gochat/users". O corpo do POST deve ser em formato JSON e pode conter as seguintes variáveis: name, username, email, password, active, roles, joinDefaultChannels, requirePasswordChange, sendWelcomeEmail, verified, customFields sendo que só são mesmo necessárias as variáveis: name, username, email, password.

-"Instruções para a criação de utilizador":
- name - String, username - String,  email - String, password - String, active - Boolean, roles - Array, joinDefaultChannels - Boolean, requirePasswordChange - Boolean, sendWelcomeEmail - Boolean, verified - Boolean, customFields - Object;

