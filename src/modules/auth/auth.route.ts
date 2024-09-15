//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
const router =  Router();
//LOGIN
router.post('/register', asyncHandler(AuthController.register));
//REGISTER
router.post('/login', asyncHandler(AuthController.login));
//FORFOT PASSWORD
router.post('/forgot-password', asyncHandler(AuthController.forgotPassword))
//RESET PASSWORD 
router.post('/reset-password/:token', asyncHandler(AuthController.resetPassword))

export default router;