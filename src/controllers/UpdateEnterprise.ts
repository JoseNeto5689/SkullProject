import prismaClient from "../database";
import { Request, Response } from "express";

class updateEnterpriseController {
    async handle(req: Request, res: Response) {
        const { enterpriseId } = req.params
        const { name, userId, config } = req.body
        try {

            const enterprise = await prismaClient.enterprise.findFirst({
                where: {
                    id: enterpriseId
                }
            })

            if (!enterprise) {
                return res.status(404).json({ status: "This enterprise dont exist" })
            }

            const newEnterprise = {
                name: name || enterprise.name,
                userId: userId || enterprise.userId,
                config: config || enterprise.config
            }

            await prismaClient.enterprise.update({
                data: newEnterprise,
                where: {
                    id: enterpriseId
                }
            })
                .then(item => {
                    res.json({ ...item })
                })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new updateEnterpriseController