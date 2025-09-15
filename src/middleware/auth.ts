import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { CustomError } from "../utils/errors";

interface TokenPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new CustomError("Token não fornecido", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "default_secret");
    const { userId, email } = decoded as TokenPayload;

    request.user = {
      id: userId,
      email,
    };

    return next();
  } catch {
    throw new CustomError("Token inválido", 401);
  }
}
