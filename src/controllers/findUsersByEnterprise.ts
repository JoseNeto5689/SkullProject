import prismaClient from "../database";
import { Request, Response } from "express";

class findUsersByEnterprise {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            let users = await prismaClient.usersOnEnterprise.findMany({
                select: {
                    User: {
                        select: {
                            id: true,
                            userName: true,
                            email: true
                        }
                    }
                },
                where: {
                    enterpriseId: id
                }
            })
            const response = users.map((item) => item.User)
            res.json(response)
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new findUsersByEnterprise