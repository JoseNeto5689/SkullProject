import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ status: "Token is missing" })
    }

    const [, token] = authToken.split(" ")

    const secret = String(process.env.SECRET)

    try {
        verify(token, secret)
        next()
    }
    catch (e) {
        response.status(401).json({ status: "Invalid token" })
    }

}