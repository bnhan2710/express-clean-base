import { Router } from "express";
import AuthRoute from "../modules/auth/auth.route"

const router = Router();

router.use('/auth', AuthRoute);

export default router;