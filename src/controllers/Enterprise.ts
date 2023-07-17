import { Request, Response } from "express";
import { EnterpriseModel } from "../model/Enterprise";
import { v4 as uuidv4 } from 'uuid';

class Enterprise {
    async new(req: Request, res: Response) {
        await EnterpriseModel.create({
            id: uuidv4(),
            name: req.body.name
        })
        res.json({ status: "ok" })
    }
}

export default Enterprise