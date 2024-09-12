import Joi from 'joi'
export const loginValid = Joi.object({
    username: Joi.string().min(3).max(255)
    .required(),
    password: Joi.string().min(5).max(255)
    .required(),
})
export const registerValid = Joi.object({
    username: Joi.string().min(3).max(255)
    .required(),
    password: Joi.string().min(5).max(255)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    fullName: Joi.string().min(10).max(255)
})
export const resetPasswordValid = Joi.object({

})
