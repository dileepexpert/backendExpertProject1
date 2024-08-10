const Joi = require("joi");

const registerValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be strong (at least 8 characters, include uppercase, lowercase, number, and special character)'
    })
});

module.exports = { registerValidation };
