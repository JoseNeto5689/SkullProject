import { Request, Response } from "express";
import prismaClient from "../database";
import GenerateToken from "../provider/GenerateToken";

class RefreshToken {
    async handle(req: Request, res: Response) {
        const { refreshToken } = req.body
        const RefreshToken = await prismaClient.refreshToken.findFirst({
            where: {
                id: refreshToken
            }
        })

        if (!RefreshToken) {
            return res.status(401).json({ status: "Token Invalid" })
        }

        const token = await GenerateToken.execute(RefreshToken.userId)

        res.json({ token })
    }
}

export default new RefreshToken