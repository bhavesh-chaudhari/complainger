import express from "express"
import * as usersController from "../controllers/user"

const router = express.Router()

router.get("/:id", usersController.getUser )

export default router