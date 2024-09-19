//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
import  {AuthToken} from '../../middleware/checkAuthToken';
import { loginValidation, registerValidation, resetPasswordValidation, emailValidation } from '../../modules/auth/validator/auth.validate';

const router =  Router();
//LOGIN
router.post('/login', validate(loginValidation), asyncHandler(AuthController.login));
//REGISTER
router.post('/register', validate(registerValidation), asyncHandler(AuthController.register));
//FORFOT PASSWORD
router.post('/forgot-password',validate(emailValidation), asyncHandler(AuthController.forgotPassword))
//RESET PASSWORD 
router.post('/reset-password/:token' ,validate(resetPasswordValidation), asyncHandler(AuthController.resetPassword))
//SEND VERIFICATION EMAIL
router.post('/send-verification-email',AuthToken , asyncHandler(AuthController.sendVerificationEmail))
// VERIFY EMAIL
router.post('/verify-email/:token', asyncHandler(AuthController.verifyEmail))

export default router;