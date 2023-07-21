import prismaClient from "../database";
import { Request, Response } from "express";

class deleteUser {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {

            await prismaClient.usersOnEnterprise.deleteMany({
                where: {
                    enterpriseId: id
                }
            })

            await prismaClient.enterprise.delete({
                where: {
                    id
                }
            })
            return res.json({ status: "Deleted" })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new deleteUser