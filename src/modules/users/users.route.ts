import { Router } from "express";
const router = Router()
import {checkAuthToken} from '../../middleware/checkAuthToken'
import UsersController from "./users.controller";
import asyncHandler from '../../middleware/asyncHandle';
router.get('/me' , checkAuthToken , asyncHandler(UsersController.getMe))

export default router