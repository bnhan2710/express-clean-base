import { Request, Response, NextFunction } from 'express';
import { loginValid, registerValid, resetPasswordValid, emailValid } from '../modules/auth/validator/auth.validate';
import { BadRequestError } from '../errors/error.response';

const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new BadRequestError(error.message);
        }
        next();
    };
};

const authValidation = {
    login: validate(loginValid),
    register: validate(registerValid),
    resetPassword: validate(resetPasswordValid),
    email: validate(emailValid),
}

export default {
    authValidation
};