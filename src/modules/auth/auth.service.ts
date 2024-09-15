import { LoginDto, RegisterDto , ResetPasswordDto} from "./dto";
import connection from "../../configs/database.config";
import { User } from "../../orm/entities/User";
import {generateAccessToken , hashPassword , comparePassword, generateResetpasswordToken} from '../../utils/auth.util'
import { ConflictRequestError, NotFoundError , AuthFailError, BadRequestError } from '../../errors/error.response'
import { emailValid, loginValid , registerValid } from "./validator/auth.validate";
import { sendMail } from "../../utils/sendMail.util";
import env from '../../env'
class AuthService {
    public async login(loginDto: LoginDto):Promise<{accessToken: string} | undefined>{
        const {error} = loginValid.validate(loginDto)
        if(error){
            throw new BadRequestError(error.message)
        }
        const user = await connection.getRepository(User).findOne({where:{username: loginDto.username }})
            if(!user){
                throw new NotFoundError('Username not found!')
            }
            const matchPassword = await comparePassword(loginDto.password,user.password)
            if(!matchPassword){
                throw new AuthFailError('Password is incorrect!')
            }
            const payloadData = {
                id: user.id,
                username: user.username
            }
            return {
                accessToken : await generateAccessToken(payloadData)
            }
    }

    public async register(registerDto: RegisterDto):Promise<void>{
            const {error} = registerValid.validate(registerDto)
            if(error){
                throw new BadRequestError(error.message)
            }
            const ExitsUser = await connection.getRepository(User).findOne({ where: { username: registerDto.username } });
            if(ExitsUser){
                throw new ConflictRequestError('User already exits')
            }
            registerDto.password = await hashPassword(registerDto.password)
            await connection.getRepository(User).save(registerDto)
            return
       }
    public async forgotPassword(email:string):Promise<void>{
            const {error} = emailValid.validate({email})
            if(error){
                throw new BadRequestError(error.message)
            }
           const checkEmail = await connection.getRepository(User).findOne({where:{email}})
           if(!checkEmail){
                throw new NotFoundError('Email is not registered')
           }
         const token = await generateResetpasswordToken();
            const expTime = new Date(Date.now() + 3600000);
          await connection.getRepository(User).update(
            { email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: expTime
            }
         )
         sendMail(email,'Reset Your Password','Reset Password','If you requested a password reset, click the button below to reset it:',`http://localhost:${env.ENV_SERVER.PORT}/api/v1/auth/reset-password/${token}`)
            return
    }
    public async resetPassword(tokenReset:string, resetPasswordDto : ResetPasswordDto):Promise<void>{
            const token = await connection.getRepository(User).findOne(
                {where:{
                resetPasswordToken:tokenReset,
            }, select: { 
                resetPasswordToken:true,
                resetPasswordExpires: true }})
            if(!token || !token.resetPasswordToken){
                throw new AuthFailError('Token is not valid')
            } 
            if(!token.resetPasswordExpires || new Date(token.resetPasswordExpires).getTime() < Date.now()){
                await connection.getRepository(User).update({resetPasswordToken: tokenReset}, {resetPasswordToken: undefined, resetPasswordExpires: undefined})
                throw new AuthFailError('Token is expired')
            }
            if(resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword){
                throw new BadRequestError('Password and confirm password not match')
            }
            const hashedPassword = await hashPassword(resetPasswordDto.newPassword)
            await connection.getRepository(User).update(
                { resetPasswordToken: tokenReset },
                {
                    password:hashedPassword,
                    resetPasswordToken: undefined,
                    resetPasswordExpires: undefined
                }
            );
            return
    }
}

export default new AuthService