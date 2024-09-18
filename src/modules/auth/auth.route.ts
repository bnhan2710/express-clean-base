//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
import { loginValidation, registerValidation, resetPasswordValidation, emailValidation } from '../../modules/auth/validator/auth.validate';

const router =  Router();
//LOGIN
router.post('/register', validate(loginValidation), asyncHandler(AuthController.register));
//REGISTER
router.post('/login', validate(registerValidation), asyncHandler(AuthController.login));
//FORFOT PASSWORD
router.post('/forgot-password',validate(emailValidation), asyncHandler(AuthController.forgotPassword))
//RESET PASSWORD 
router.post('/reset-password/:token' ,validate(resetPasswordValidation), asyncHandler(AuthController.resetPassword))

export default router;