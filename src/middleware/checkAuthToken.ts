
import { Request, Response , NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthFailError } from '../errors/error.response';
import env from "../env"

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export function checkAuthToken(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.replace('Bearer ','')
    if(!token){
        throw new AuthFailError('Token is required')
    }
    jwt.verify(token, env.SECRET_KEY, (err, user) => {
        if (err) {
            throw new AuthFailError('Token is invalid');
        }
        req.user = user as JwtPayload; 
        next();
    });
}

