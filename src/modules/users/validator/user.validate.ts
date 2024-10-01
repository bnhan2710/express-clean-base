import Joi from 'joi'

export const updateUserValidation = Joi.object({
    fullName: Joi.string().min(10).max(255).messages({
        'string.min': 'Fullname must be at least 10 characters',
    }),
});
