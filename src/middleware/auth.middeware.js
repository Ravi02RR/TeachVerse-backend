import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function authMiddleware(req, res, next) {
    const token = req.cookies?.accesstoken || req.headers.accesstoken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, env.jwt.ACESS_TOKEN_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }

}

export default authMiddleware;