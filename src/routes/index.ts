import { Router } from "express";
import Enterprise from "../controllers/Enterprise";

const enterprise = new Enterprise()

const router = Router()

router.post('/enterprise', enterprise.new)

export { router }