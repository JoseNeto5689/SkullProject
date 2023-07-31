import { Response, Request } from "express";

class CheckAuthentication {
    handle(req: Request, res: Response) {
        res.json({ authenticated: true })
    }
}

export default new CheckAuthentication