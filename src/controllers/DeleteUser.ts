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
                    },
                    enterprises: {
                        select: {
                            id: true
                        }
                    },
                    refresh_token: {
                        select: {
                            id: true
                        }
                    }

                }
            })

            const isChef = user?.Enterprise
            const isUserOfEnterprise = user?.enterprises
            const hasRefreshToken = user?.refresh_token

            if (isUserOfEnterprise) {
                await prismaClient.usersOnEnterprise.deleteMany({
                    where: {
                        userId: id
                    }
                })
            }
            if (isChef) {
                let enterprises = user.Enterprise.map(item => item.id)
                await prismaClient.usersOnEnterprise.deleteMany({
                    where: {
                        enterpriseId: {
                            in: enterprises
                        }
                    }
                })

                await prismaClient.enterprise.deleteMany({
                    where: {
                        userId: id
                    }
                })
            }
            if (hasRefreshToken) {
                await prismaClient.refreshToken.deleteMany({
                    where: {
                        userId: id
                    }
                })
            }

            await prismaClient.user.delete({
                where: {
                    id
                }
            })

            return res.json({ status: "Deleted" })

        }

        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default new deleteUser