import { Request, Response } from "express";
import prismaClient from "../database";


class findAllEnterprise {
    async handle(req: Request, res: Response) {
        const enterprise = await prismaClient.enterprise.findMany()
        if (!enterprise) {
            return res.status(404).json({ status: "No enterprises registered" })
        }
        return res.json(enterprise)
    }
}

export default new findAllEnterprise