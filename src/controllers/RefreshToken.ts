import { Request, Response } from "express";
import prismaClient from "../database";
import GenerateToken from "../provider/GenerateToken";
import dayjs from "dayjs";
import GenerateRefreshToken from "../provider/GenerateRefreshToken";

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

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(RefreshToken.expiresIn))

        const token = await GenerateToken.execute(RefreshToken.userId)

        if (refreshTokenExpired) {
            await prismaClient.refreshToken.deleteMany({
                where: {
                    userId: RefreshToken.userId
                }
            })
            const newRefreshToken = await GenerateRefreshToken.execute(RefreshToken.userId)
            return res.json({ token, refreshToken: newRefreshToken })
        }

        return res.json({ token })

    }
}

export default new RefreshToken