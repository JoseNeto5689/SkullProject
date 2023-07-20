import prismaClient from "../database";
import { Request, Response } from "express";

class findUser {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            const users = await prismaClient.user.findFirst({
                where: {
                    id
                }
            })
            res.json(users)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new findUser