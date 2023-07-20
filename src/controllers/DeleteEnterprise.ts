import prismaClient from "../database";
import { Request, Response } from "express";

class deleteUser {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            const enterprise = await prismaClient.enterprise.delete({
                where: {
                    id
                }
            })
            res.json(enterprise)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new deleteUser