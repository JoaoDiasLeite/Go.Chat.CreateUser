const Joi = require('joi')
const schema = Joi.object({ //esquema para verificação do json do corpo
    name: Joi.string().required(), //variaveis do form
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    active: Joi.boolean(),
    roles: Joi.array(),
    joinDefaultChannels: Joi.boolean(),
    requirePasswordChange: Joi.boolean(),
    sendWelcomeEmail: Joi.boolean(),
    verified: Joi.bool(),
    customFields: Joi.object(),



});
module.exports.schema = schema;