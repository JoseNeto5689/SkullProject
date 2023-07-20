import prismaClient from "../database"
import dayjs from "dayjs"

class GenerateRefreshToken {
    async execute(userId: string) {
        const expiresIn = dayjs().add(15, "second").unix()
        const generatedRefreshToken = await prismaClient.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        })

        return generatedRefreshToken
    }
}

export default new GenerateRefreshToken