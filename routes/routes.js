import express from "express"
import {
  handleCreateShortURL,
  handleGetAllUrls,
  handleGetShortURL,
} from "../controller/idController.js"

const router = express.Router()

router.post("/", handleCreateShortURL)

router.get("/", handleGetAllUrls)

router.get("/:shortId", handleGetShortURL)

export default router
