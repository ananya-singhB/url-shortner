import express from "express"
import {
  getAllUrls,
  handleCreateShortURL,
  handleGetShortURL,
} from "../controller/idController.js"

const router = express.Router()

router.get("/", async(req, res) => {
  const urls = await getAllUrls(req);

  return res.render("home", {urls, viewOnly: true})
})

router.post("/", handleCreateShortURL)

router.get("/:shortId", handleGetShortURL)

export default router
