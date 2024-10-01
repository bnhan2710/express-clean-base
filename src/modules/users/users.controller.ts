import { Request, Response , NextFunction } from "express";
import UserService from "../users/users.service"
import { StatusCodes } from "http-status-codes";
import { UpdateUserDTO } from "./dto/update-user.dto";
interface CustomRequest extends Request {
    user?: any; 
}

class UserController {
    public async getMe(req: CustomRequest , res: Response, next :NextFunction){
      res.status(StatusCodes.OK).json(await UserService.getMe(req.user.id))
    }
    public async getAllUser(req:Request, res: Response , next:NextFunction){
      const users = await UserService.getAll();
      res.status(StatusCodes.OK).json(users)
    } 
    public async getUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      const user = await UserService.getOneUserById(id);
      res.status(StatusCodes.OK).json(user)
    }
    public async updateUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      const updateUserDto = UpdateUserDTO(req.body)
      await UserService.updateOneUserById(id,updateUserDto)
      res.send({message:'Update info succesfully!'})
    }
    public async deleteUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      await UserService.deleteUserById(id)
      res.send({message: 'Delete user succesfully!'})
    }
}

export default new UserController