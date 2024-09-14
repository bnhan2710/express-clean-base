//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO} from './dto';
class AuthController {
    public async login(req: Request, res: Response, next : NextFunction){
        const loginDto = LoginDTO(req.body);
        
        res.send(await AuthService.login(loginDto))
    }
    public async register(req: Request, res: Response, next : NextFunction){
        const registerDto = RegisterDTO(req.body);
        await AuthService.register(registerDto);
        res.status(201).json({message: 'Register successfully'});
    }
    public async forgotPassword(req:Request ,res: Response, next: NextFunction){
        await AuthService.forgotPassword(req.body.email);
        res.send({message: 'Email has been sent, Please check your email to reset your password'})
    }
}

export default new AuthController;