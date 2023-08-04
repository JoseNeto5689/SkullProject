import { Request, Response } from "express";
import SendEmail from "../extra";

class SendEmailController {
    async handle(req: Request, res: Response) {
        SendEmail()
            .then((result) => {
                res.json({ result })
            })
    }
}

export default new SendEmailController