import { Router } from "express";
import findUsersByEnterprise from "../controllers/FindUsersByEnterprise";
import createUser from "../controllers/CreateUser";
import refreshToken from "../controllers/RefreshToken";
import authenticateUser from "../controllers/AuthenticateUser";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import findEnterprise from "../controllers/FindEnterprise";
import findAllEnterprise from "../controllers/FindAllEnterprise";
import FindUser from "../controllers/FindUser";
import DeleteUser from "../controllers/DeleteUser";
import DeleteEnterprise from "../controllers/DeleteEnterprise";

const router = Router()

router.get("/users", ensureAuthenticate, FindUser.handle)
router.get("/users/:id", ensureAuthenticate, findUsersByEnterprise.handle)
router.get("/enterprise", ensureAuthenticate, findAllEnterprise.handle)
router.get("/enterprise/config/:id", ensureAuthenticate, findEnterprise.handle)

router.post("/user", createUser.handle)
router.post("/login", authenticateUser.handle)
router.post("/refresh-token", refreshToken.handle)

//Consertar delete, para remover primeiro a conexão entre as tabelas
router.delete("/user/:id", DeleteUser.handle)
router.delete("/enterprise/:id", DeleteEnterprise.handle)

export { router }