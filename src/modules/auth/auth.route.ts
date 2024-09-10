//AuthRoute
import { Router } from 'express';
import  AuthController  from './auth.controller';
import asyncHandler from '../../middleware/asyncHandle';
const router =  Router();

router.post('/login', asyncHandler(AuthController.login));
router.post('/register', asyncHandler(AuthController.register));

export default router;