import { Request, Response } from "express";

export interface ApiResponse {
    status: number;
    message: string;
    data?: any;
    type: 'success' | 'error';
  }

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export type ControllerFunction = (
    req: Request | AuthenticatedRequest,
    res: Response,
) =>  Promise<ApiResponse>;