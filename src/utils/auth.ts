import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import env from '../env';

export const generateAccessToken = (data: string | object): string => {
    try {
        if (!env.ENV_SERVER.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined');
        }
        return jwt.sign({ data }, env.ENV_SERVER.SECRET_KEY, { expiresIn: 60 * 60 });
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

export const verifyToken = (token: string): any => {
    try {
        if (!env.ENV_SERVER.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined');
        }
        return jwt.verify(token, env.ENV_SERVER.SECRET_KEY);
    } catch (error) {
        throw new Error('Token verification failed');
    }
};

export const hashPassword = (password: string): string => {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};