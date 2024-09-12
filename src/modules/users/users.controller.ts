import { Request, Response , NextFunction } from "express";
import UserService from "../users/users.service"

interface CustomRequest extends Request {
    user?: any; 
}

class UserController {
    public async getMe(req: CustomRequest , res: Response, next :NextFunction){
      const user =  await UserService.getOne(req.user.id)
      res.status(200).json(user)
    } 
}

export default new UserController