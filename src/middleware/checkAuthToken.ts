
import { Request, Response , NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthFailError } from '../errors/error.response';
import env from "../env"


export function AuthToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.replace('Bearer ','')
    if(!token){
        throw new AuthFailError('You need to login to access');
    }
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            throw new AuthFailError('Token is invalid');
        }
        req.user = decoded as JwtPayload
        next();
    });
}

