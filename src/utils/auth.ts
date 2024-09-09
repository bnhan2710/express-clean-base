import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'your-secret-key';

export const generateAccessToken = (data: string | object): string => {
    try {
        return jwt.sign({ data }, SECRET_KEY, { expiresIn: 60 * 60 });
    } catch (error) {
        throw new Error('Token generation failed');
    }
};

export const comparePassword = (password: string, hash: string): boolean => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Password comparison failed');
    }
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, SECRET_KEY);
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