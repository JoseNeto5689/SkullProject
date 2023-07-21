import prismaClient from "../database";
import { Request, Response } from "express";

class createEnterpriseController {
    async handle(req: Request, res: Response) {
        const { name, userId, config } = req.body
        try {

            const enterpriseExist = await prismaClient.enterprise.findFirst({
                where: {
                    name,
                    userId
                }
            })

            if (enterpriseExist) {
                return res.status(409).json({ status: "This user already have a enterprise with this name" })
            }

            await prismaClient.enterprise.create({
                data: {
                    name,
                    userId,
                    config: config || JSON.stringify({})
                }
            })
                .then(item => {
                    return res.json({ ...item })
                })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new createEnterpriseController