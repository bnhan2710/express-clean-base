import { LoginDto, RegisterDto , ResetPasswordDto} from "./dto";
import connection from "../../configs/database.config";
import { User } from "../../orm/entities/User";
import { Token } from '../../orm/entities/Token';
import { generateAccessToken , hashPassword , comparePassword, generateToken } from '../../utils/auth.util'
import { ConflictRequestError, NotFoundError , AuthFailError, BadRequestError } from '../../errors/error.response'
import { sendMail } from "../../utils/sendMail.util";
import { TokenTypes } from "../../common/enums/tokens";
import env from '../../env'
class AuthService {

    public async login(loginDto: LoginDto):Promise<{accessToken: string} | undefined>{
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
            const ExitsUser = await connection.getRepository(User).findOne({ where: { username: registerDto.username } });
            if(ExitsUser){
                throw new ConflictRequestError('User already exits')
            }
            registerDto.password = await hashPassword(registerDto.password)
            await connection.getRepository(User).save(registerDto)
            return
       }

    public async forgotPassword(email:string):Promise<void>{
           const checkUser = await connection.getRepository(User).findOne({where:{email}})
           if(!checkUser){
                throw new NotFoundError('Email is not registered')
           }
         const token = await generateToken();
            const expires = new Date(Date.now() + 3600000);
            await connection.getRepository(Token).save({
                token,
                type:TokenTypes.RESET_PASSWORD,
                expires,
                user: checkUser
            })
         sendMail(email,'Reset Your Password','Reset Password','If you requested a password reset, click the button below to reset it:',`http://localhost:${env.ENV_SERVER.PORT}/api/v1/auth/reset-password/${token}`)
            return
    }
    
    public async resetPassword(tokenReset:string, resetPasswordDto : ResetPasswordDto):Promise<void>{
        const queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const token = await queryRunner.manager.getRepository(Token).findOne({
                where: { token: tokenReset },
                relations: ['user']
            });
            if (!token) {
                throw new AuthFailError('URL is not valid');
            }
            if (new Date(token.expires).getTime() < Date.now()) {
                await queryRunner.manager.getRepository(Token).delete({ token: tokenReset });
                throw new AuthFailError('URL is expired');
            }
            if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
                throw new BadRequestError('Password and confirm password do not match');
            }
            const hashedPassword = await hashPassword(resetPasswordDto.newPassword);
            await queryRunner.manager.getRepository(User).update({ id: token.user.id }, { password: hashedPassword });
            await queryRunner.manager.getRepository(Token).delete({token: tokenReset});
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error)
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
    public async sendVerificationEmail(id : number){
        const user = await connection.getRepository(User).findOne({ where: { id } })
        if(!user){
            throw new NotFoundError('Username not found!')
        }
        if(user?.isVetificationEmail){
            throw new BadRequestError('Email already vetification')
        }
        const token = generateToken();
        const expires = new Date(Date.now() + 3600000);
        await connection.getRepository(Token).save({
            token,
            type:TokenTypes.VERIFY_EMAIL,
            expires,
            user: user
        })
        sendMail(user.email,'Vetification Email','Vetification Email','Click the button below vetification your email:',`http://localhost:${env.ENV_SERVER.PORT}/api/v1/auth/verify-email/${token}`)
        return
    }
    public async verifyEmail(token: string  ) {
            const queryRunner = connection.createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const tokenEntity = await queryRunner.manager.getRepository(Token).findOne({
                    where: { token },
                    relations: ['user']
                });
                if (!tokenEntity) {
                    throw new AuthFailError('URL is not valid');
                }
                if (new Date(tokenEntity.expires).getTime() < Date.now()) {
                    await queryRunner.manager.getRepository(Token).delete({ token });
                    throw new AuthFailError('URL is expired');
                }
                await queryRunner.manager.getRepository(User).update({ id: tokenEntity.user.id }, { isVetificationEmail: true });
                await queryRunner.manager.getRepository(Token).delete({token});
                await queryRunner.commitTransaction();
            } catch (error) {
                await queryRunner.rollbackTransaction();
                console.log(error)
                throw error;
            } finally {
                await queryRunner.release();
            }
    }
}


export default new AuthService