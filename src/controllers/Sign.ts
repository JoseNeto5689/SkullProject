import prismaClient from "../database";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"

class Sign {
    async create(req: Request, res: Response) {
        const { email, userName, password } = req.body

        try {
            await prismaClient.user.create({
                data: {
                    email,
                    userName,
                    password: bcrypt.hashSync(password)
                }
            })
            return res.json({ status: "ok" })


        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new Sign