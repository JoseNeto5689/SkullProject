import { Request, Response } from "express";
import prismaClient from "../database";


class findEnterprise {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const enterprise = await prismaClient.enterprise.findFirst({
            where: {
                id
            },
        })

        if (!enterprise) {
            return res.status(404).json({ status: "Enterprise dont found" })
        }

        return res.json(enterprise)
    }
}

export default new findEnterprise