import prismaClient from "../database";
import { Request, Response } from "express";
import { hash } from "bcryptjs"

class createUserController {
    async handle(req: Request, res: Response) {
        const { userName, email, password } = req.body
        try {
            const userExists = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            if (userExists) {
                return res.status(401).json({ status: "This user already exists" })
            }

            const passwordHash = await hash(password, 8)

            await prismaClient.user.create({
                data: {
                    userName,
                    email,
                    password: passwordHash
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

export default new createUserController