import { LoginDto, RegisterDto } from "./dto";
import connection from "../../configs/database.config";
import { User } from "../../orm/entities/User";
import {generateAccessToken , hashPassword , comparePassword} from '../../utils/auth'

class AuthService {
    public async login(loginDto: LoginDto):Promise<{accessToken: string}>{
        try {
            const user = await connection.getRepository(User).findOne({where:{username: loginDto.username }})
            if(!user){
                throw Error('Not Found User')
            }
            const matchPassword = await comparePassword(loginDto.password,user.password)
            if(!matchPassword){
                throw Error('Password is incorrect')
            }
            
            return {
                accessToken : await generateAccessToken((user.id).toString())
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
    

    public async register(registerDto: RegisterDto):Promise<void>{
       try{
            const ExitsUser = await connection.getRepository(User).findOne({ where: { username: registerDto.username } });
            if(ExitsUser){
                throw Error('User already exits')
            }
            registerDto.password = await hashPassword(registerDto.password)
            await connection.getRepository(User).save(registerDto)
            return;
       }catch(err){
            throw new Error(err as string)
       }
    }
}

export default new AuthService;