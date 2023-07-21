import prismaClient from "../database";
import { Request, Response } from "express";
import { hash } from "bcryptjs";

class updateUserController {
    async handle(req: Request, res: Response) {
        const { userId } = req.params
        const { email, userName, password } = req.body
        try {

            const user = await prismaClient.user.findFirst({
                where: {
                    id: userId
                }
            })


            if (!user) {
                return res.status(404).json({ status: "This user dont exist" })
            }

            let passwordHash = !password ? user.password : await hash(password, 8)

            const newUser = {
                email: email || user.email,
                userName: userName || user.userName,
                password: passwordHash
            }

            await prismaClient.user.update({
                data: newUser,
                where: {
                    id: userId
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

export default new updateUserController