import { Request, Response } from "express";
import prismaClient from "../database";


class AddUserToEnterprise {
    async handle(req: Request, res: Response) {
        const { enterpriseId, userId } = req.params

        const userInEnterprise = await prismaClient.usersOnEnterprise.findFirst({
            where: {
                userId,
                enterpriseId
            }
        })

        if (userInEnterprise) {
            return res.status(400).json({ status: "This user is already registered" })
        }

        const response = await prismaClient.usersOnEnterprise.create({
            data: {
                userId,
                enterpriseId
            }
        })

        res.json(response)


    }
}

export default new AddUserToEnterprise