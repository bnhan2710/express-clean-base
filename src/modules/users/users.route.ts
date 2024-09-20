import { Router } from "express";
const router = Router()
import {AuthToken} from '../../middleware/checkAuthToken'
import UsersController from "./users.controller";
import asyncHandler from '../../middleware/asyncHandle';

router.get('/me' , AuthToken , asyncHandler(UsersController.getMe))
//USE FOR ADMIN
router.get('/:id', AuthToken, asyncHandler(UsersController.getOne))
router.get('/', asyncHandler(UsersController.getAll))
router.post('/:id', AuthToken , asyncHandler(UsersController.updateUserById))
router.patch('/:id', AuthToken ,asyncHandler(UsersController.updateUserById))
export default router