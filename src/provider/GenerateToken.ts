import { sign } from "jsonwebtoken"

class GenerateToken {
    async execute(userId: string) {
        const secret = String(process.env.SECRET)

        const token = sign({}, secret, {
            expiresIn: "5m",
            subject: userId
        })

        return token
    }
}

export default new GenerateToken