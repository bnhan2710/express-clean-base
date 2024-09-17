//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
const router =  Router();
//LOGIN
router.post('/register', validate.authValidation.register, asyncHandler(AuthController.register));
//REGISTER
router.post('/login', validate.authValidation.login, asyncHandler(AuthController.login));
//FORFOT PASSWORD
router.post('/forgot-password',validate.authValidation.email, asyncHandler(AuthController.forgotPassword))
//RESET PASSWORD 
router.post('/reset-password/:token' ,validate.authValidation.resetPassword, asyncHandler(AuthController.resetPassword))

export default router;