import { Response, NextFunction } from "express";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { AuthenticatedRequest } from "@/types/base.types";

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if(!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    req.user = session.user;

    next();
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const protect = requireAuth;
