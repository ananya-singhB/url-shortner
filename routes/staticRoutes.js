import express from "express"
import { handleGetAllUrls } from "../controller/idController.js"
import { restrictToLoggedInUser } from "../middlewares/auth.js"

const router = express.Router()

router.get("/", restrictToLoggedInUser, handleGetAllUrls)

router.get("/signup", (_, res) => {
    return res.render("signup")
})

router.get("/login", (_, res) => {
    return res.render("login")
})

export default router
