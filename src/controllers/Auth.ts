import prismaClient from "../database";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

class Auth {
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const user = await prismaClient.user.findFirst({
                select: {
                    email: true,
                    password: true,
                    id: true
                },
                where: {
                    email
                }
            })

            const isValid = await bcrypt.compare(password, user?.password || "")

            if (!isValid) {
                return res.status(400).json({ status: "Não autenticado" })
            }
            const secret = process.env.SECRET
            const token = jwt.sign({ id: user?.id }, String(secret), { expiresIn: '1d' })

            res.json({
                token
            })


        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new Auth