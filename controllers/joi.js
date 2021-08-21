const joi = require('joi');

const newUserSchema = joi.object({
    firstname: joi.string().required().trim(),
    lastname: joi.string().required().trim(),
    email: joi.string().email().required(),
});

module.exports = {
    newUserSchema
}