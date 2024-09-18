import Joi from 'joi'
export const loginValidation = Joi.object({
    username: Joi.string().min(3).max(255)
    .required(),
    password: Joi.string().min(5).max(255)
    .required(),
})
export const registerValidation = Joi.object({
    username: Joi.string().min(3).max(255)
    .required(),
    password: Joi.string().min(5).max(255)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    fullName: Joi.string().min(10).max(255)
})

export const resetPasswordValidation = Joi.object({
    newPassword: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().min(5).max(255).required()
})

export const emailValidation = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
})