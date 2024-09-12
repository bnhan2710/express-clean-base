//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
const router =  Router();
//LOGIN
router.post('/login', asyncHandler(AuthController.login));
//REGISTER
router.post('/register', asyncHandler(AuthController.register));
//FORFOT PASSWORD

export default router;