import prismaClient from "../database";
import { Request, Response } from "express";
import { compare } from "bcryptjs"
import GenerateRefreshToken from "../provider/GenerateRefreshToken";
import GenerateToken from "../provider/GenerateToken";

interface IRequest {
    email: string,
    password: string
}

class AuthenticateUser {
    async handle(req: Request, res: Response) {
        try {
            const { email, password } = <IRequest>req.body
            const user = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            if (!user) {
                return res.status(401).json({ status: "This email is not registered" })
            }

            const passwdMatch = await compare(password, user.password)

            if (!passwdMatch) return res.status(401).json({ status: "The password dont match" })

            const token = await GenerateToken.execute(user.id)

            await prismaClient.refreshToken.deleteMany({
                where: {
                    userId: user.id
                }
            })

            const refreshToken = await GenerateRefreshToken.execute(user.id)

            return res.json({ token, refreshToken })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new AuthenticateUser