import { config } from "@/config/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (payload: { userId: string; email: string }) => {
    return jwt.sign(payload, config.security.jwt.secret, { expiresIn: '8h'} );
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.security.jwt.secret) as { userId: string; email: string };
}

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}

export const extractTokenFromHeader = (authHeader?: string) => {
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.substring('Bearer '.length).trim();
}