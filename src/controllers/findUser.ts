import prismaClient from "../database";
import { Request, Response } from "express";

class findUser {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id
                }
            })

            if (!user) {
                return res.status(404).json({ status: "User not found" })
            }

            res.json(user)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new findUser