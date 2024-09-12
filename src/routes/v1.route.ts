import { Router } from "express";
import AuthRoute from "../modules/auth/auth.route"
import UserRoute from "../modules/users/users.route"
const router = Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute)

export default router;