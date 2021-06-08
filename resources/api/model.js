const Joi = require('joi')
const schema = Joi.object({
    name: Joi.string().required(),
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