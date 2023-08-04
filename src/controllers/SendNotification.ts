import { Request, Response } from "express";
import Notification from "../utils/notification";

class SendNotification {
    async handle(req: Request, res: Response) {
        const { content } = req.body
        Notification(content)
            .then(result => {
                res.json(result)
            })
            .catch(e => {
                res.status(300).json(e)
            })
    }
}

export default new SendNotification