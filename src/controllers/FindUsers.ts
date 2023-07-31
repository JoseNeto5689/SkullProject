import prismaClient from "../database";
import { Request, Response } from "express";

class findUsers {
    async handle(req: Request, res: Response) {
        try {
            const user = await prismaClient.user.findMany()

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

export default new findUsers