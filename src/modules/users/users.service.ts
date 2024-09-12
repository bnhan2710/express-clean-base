import connection from "../../configs/database.config";
import { User } from "../../orm/entities/User";
import { NotFoundError } from "../../errors/error.response";
class UserService{
    public async getOne(id:number){
        const user = await connection.getRepository(User).findOne(
            {where:{id}, 
            select:{
                username:true,
                fullName:true
            }})
        if(!user){
            throw new NotFoundError('User not found')
        }
        return user
    }
}

export default new UserService
