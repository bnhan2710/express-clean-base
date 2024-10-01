import { Router } from "express";
const router = Router()
import {AuthToken} from '../../middleware/checkAuthToken'
import UsersController from "./users.controller";
import asyncHandler from '../../middleware/asyncHandle';
import { updateUserValidation } from "./validator/user.validate";
import validate from '../../middleware/validate'



router.get('/me' , AuthToken , asyncHandler(UsersController.getMe))
//USE FOR ADMIN
router.get('/', asyncHandler(UsersController.getAllUser))
router.get('/:id', AuthToken, asyncHandler(UsersController.getUserById))
router.patch('/:id',validate(updateUserValidation), AuthToken ,asyncHandler(UsersController.updateUserById))
router.delete('/:id', AuthToken , asyncHandler(UsersController.deleteUserById))

export default router