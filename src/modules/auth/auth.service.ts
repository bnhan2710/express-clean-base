import { LoginDto, RegisterDto } from "./dto";
import connection from "../../configs/database.config";
import { User } from "../../orm/entities/User";
import {generateAccessToken , hashPassword , comparePassword} from '../../utils/auth'
import { ConflictRequestError, NotFoundError , AuthFailError, BadRequestError } from '../../errors/error.response'
import { loginValid , registerValid } from "./validator/auth.validate";
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
            return {
                accessToken : await generateAccessToken((user.id).toString())
            }
    }


    public async register(registerDto: RegisterDto):Promise<void>{
            const {error} = registerValid.validate(registerDto)
            if(error){
                console.log(error)
                throw new BadRequestError(error.message)
            }
            const ExitsUser = await connection.getRepository(User).findOne({ where: { username: registerDto.username } });
            if(ExitsUser){
                throw new ConflictRequestError('User already exits')
            }
            registerDto.password = await hashPassword(registerDto.password)
            await connection.getRepository(User).save(registerDto)
            return;
       }
}

export default new AuthService;