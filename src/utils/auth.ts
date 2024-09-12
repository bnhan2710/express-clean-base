import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import env from '../env';

export const generateAccessToken = (data: string | object): string => {
    try {
        if (!env.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined');
        }
        return jwt.sign( data , env.SECRET_KEY, { expiresIn: 60 * 60 });
    } catch (error) {
        throw new Error('Token generation failed');
    }
};

export const comparePassword = (password: string, hash: string): boolean => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};


export const hashPassword = (password: string): string => {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

// export const checkOTP = (OTP:number) : boolean => {
//     try{

//     }catch
// }