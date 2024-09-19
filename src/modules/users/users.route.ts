import { Router } from "express";
const router = Router()
import {AuthToken} from '../../middleware/checkAuthToken'
import UsersController from "./users.controller";
import asyncHandler from '../../middleware/asyncHandle';

router.get('/me' , AuthToken , asyncHandler(UsersController.getMe))

export default router