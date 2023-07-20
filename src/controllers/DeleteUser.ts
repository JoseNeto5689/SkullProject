import prismaClient from "../database";
import { Request, Response } from "express";

class deleteUser {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id
                },
                include: {
                    Enterprise: {
                        select: {
                            id: true
                        }
                    }
                }
            })

            if (user?.Enterprise) {
                await user?.Enterprise.forEach(item => {
                    prismaClient.enterprise.delete({
                        where: {
                            id: item.id
                        }
                    })
                })
            }
            await prismaClient.user.delete({
                where: {
                    id
                }
            })

            return res.json({ status: "Deletado com sucesso" })

        }

        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new deleteUser