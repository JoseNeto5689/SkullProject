import { Router } from "express";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import createUser from "../controllers/CreateUser";
import refreshToken from "../controllers/RefreshToken";
import authenticateUser from "../controllers/AuthenticateUser";

import findUsersByEnterprise from "../controllers/FindUsersByEnterprise";
import findEnterprise from "../controllers/FindEnterprise";
import findAllEnterprise from "../controllers/FindAllEnterprise";
import findUser from "../controllers/FindUser";
import deleteUser from "../controllers/DeleteUser";
import deleteEnterprise from "../controllers/DeleteEnterprise";
import addUserToEnterprise from "../controllers/AddUserToEnterprise";
import createEnterprise from "../controllers/CreateEnterprise";
import updateEnterprise from "../controllers/UpdateEnterprise";
import UpdateUser from "../controllers/UpdateUser";

const router = Router()

router.get("/users", ensureAuthenticate, findUser.handle)
router.get("/users/:id", ensureAuthenticate, findUsersByEnterprise.handle)
router.get("/enterprise", ensureAuthenticate, findAllEnterprise.handle)
router.get("/enterprise/:id", ensureAuthenticate, findEnterprise.handle)

router.post("/user", createUser.handle)
router.post("/enterprise", ensureAuthenticate, createEnterprise.handle)
router.post("/login", authenticateUser.handle)
router.post("/refresh-token", refreshToken.handle)
router.post("/add/:enterpriseId/:userId", ensureAuthenticate, addUserToEnterprise.handle)

router.patch("/user/:userId", ensureAuthenticate, UpdateUser.handle)
router.patch("/enterprise/:enterpriseId", ensureAuthenticate, updateEnterprise.handle)

router.delete("/user/:id", ensureAuthenticate, deleteUser.handle)
router.delete("/enterprise/:id", ensureAuthenticate, deleteEnterprise.handle)

export { router }