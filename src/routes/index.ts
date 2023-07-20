import { Router } from "express";
import findUsersByEnterprise from "../controllers/FindUsersByEnterprise";
import createUser from "../controllers/CreateUser";
import refreshToken from "../controllers/RefreshToken";
import authenticateUser from "../controllers/AuthenticateUser";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const router = Router()

router.get("/users/:id", ensureAuthenticate, findUsersByEnterprise.handle)

router.post("/user", createUser.handle)
router.post("/login", authenticateUser.handle)
router.post("/refresh-token", refreshToken.handle)

export { router }