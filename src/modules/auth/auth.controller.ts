//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO , ResetPasswordDTO} from './dto';
import { StatusCodes } from 'http-status-codes';
class AuthController {
    public async login(req: Request, res: Response, next : NextFunction){
        const loginDto = LoginDTO(req.body);
        res.status(StatusCodes.OK).json(await AuthService.login(loginDto))
    }
    public async register(req: Request, res: Response, next : NextFunction){
        const registerDto = RegisterDTO(req.body);
        await AuthService.register(registerDto);
        res.send({message: 'Register successfully'});
    }
    public async forgotPassword(req:Request ,res: Response, next: NextFunction){
        await AuthService.forgotPassword(req.body.email);
        res.send({message: 'Email has been sent, Please check your email to reset your password'})
    }
    public async resetPassword(req:Request ,res: Response, next: NextFunction){
        const token = req.params.token as string;
        const resetPasswordDto = ResetPasswordDTO(req.body);
        await AuthService.resetPassword(token, resetPasswordDto);
        res.send({message: 'Password has been reset successfully'})
    }
    public async sendVerificationEmail(req:Request ,res: Response, next: NextFunction){
        await AuthService.sendVerificationEmail(parseInt(req.user?.id))
        res.send({message: 'Email has been sent, Please check your email to vetification'})
    }
    public async verifyEmail(req:Request ,res: Response, next: NextFunction){
        const token = req.params.token as string;
        await AuthService.verifyEmail(token)
        res.send({message: 'Email vetification succesfully'})
    }
    
}

export default new AuthController;
