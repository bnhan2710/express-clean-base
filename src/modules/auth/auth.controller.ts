//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO, ForgotPasswordDTO } from './dto';
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
    // public async forgotPassword(req:Request ,res: Response, next: NextFunction){
    //     const forgotPasswordDto = ForgotPasswordDTO(req.body);
    //     await AuthService.
    // }
}

export default new AuthController;