import { Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { AuthenticatedRequest } from "@/types/base.types";

export const requireAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        //Extracting token from auth headers
        const token = extractTokenFromHeader(req.headers.authorization);
        
        if (!token) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        
        const decoded = verifyToken(token);
        
        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };

        next();
    } catch (error) {
        console.error('Failed to authenticate user:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const protect = requireAuth;