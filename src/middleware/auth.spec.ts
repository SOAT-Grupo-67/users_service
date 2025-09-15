import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./auth";
import { CustomError } from "../utils/errors";
import { sign } from "jsonwebtoken";

describe("Auth Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should throw UnauthorizedError when no token is provided", () => {
    mockRequest = {
      headers: {},
    };

    expect(() => {
      authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
    }).toThrow(CustomError);
  });

  it("should throw UnauthorizedError when token is invalid", () => {
    mockRequest = {
      headers: {
        authorization: "Bearer invalid_token",
      },
    };

    expect(() => {
      authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
    }).toThrow(CustomError);
  });

  it("should call next function when token is valid", () => {
    const token = sign(
      { userId: 1, email: "test@example.com" },
      process.env.JWT_SECRET || "default_secret"
    );

    mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockRequest.user).toEqual({
      id: 1,
      email: "test@example.com",
    });
  });
});
