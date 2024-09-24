import { Router } from "express";
const router = Router()
import {AuthToken} from '../../middleware/checkAuthToken'
import UsersController from "./users.controller";
import asyncHandler from '../../middleware/asyncHandle';

router.get('/me' , AuthToken , asyncHandler(UsersController.getMe))
//USE FOR ADMIN
router.get('/:id', AuthToken, asyncHandler(UsersController.getOne))
router.get('/', asyncHandler(UsersController.getAll))
router.patch('/:id', AuthToken ,asyncHandler(UsersController.updateUserById))
router.delete('/:id', AuthToken , asyncHandler(UsersController.deleteUserById))

export default router