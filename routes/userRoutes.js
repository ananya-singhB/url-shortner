import express from "express"
import {
  handleUserLogin,
  handleUserSignUp,
} from "../controller/userController.js"

const router = express.Router()

// router.get("/", render userProfile here)
router.post("/signup", handleUserSignUp)
router.post("/login", handleUserLogin)

export default router
