import { Router } from "express";
import findUsersByEnterprise from "../controllers/findUsersByEnterprise";
import Auth from "../controllers/Auth";
import Sign from "../controllers/Sign";

const router = Router()

router.get("/users/:id", findUsersByEnterprise.handle)

router.post("/sign", Sign.create)
router.post("/auth", Auth.login)

export { router }