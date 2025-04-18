import { nanoid } from "nanoid"
import Url from "../models/url-short-id.js"

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url)
    return parsed?.protocol === "http:" || parsed?.protocol === "https:"
  } catch (err) {
    return false
  }
}

export const getAllUrls = async (req) => {
  return await Url.find({ createdBy: req.user._id })
}

export const handleCreateShortURL = async (req, res) => {
  const { url } = req.body
  const urls = await getAllUrls(req)

  if (!url) {
    return res.status(400).render("home", { error: "Url is required.", urls })
  }

  const shortId = nanoid(8)

  if (!isValidUrl(url)) {
    return res.render("home", {
      error: "Invalid Url provided.",
      urls,
    })
  }

  return await Url.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  })
    .then(async () => {
      const urls = await getAllUrls(req)
      return res.render("home", { id: shortId, urls, viewOnly: true })
    })
    .catch((err) =>
      res.render("home", { error: err.errorResponse.errmsg, urls })
    )
}

export const handleGetShortURL = async (req, res) => {
  const shortId = req.params.shortId

  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  )

  if (!entry?.redirectURL)
    return res.status(404).json({ error: `No related Url found!` })

  return res.redirect(entry?.redirectURL)
}

export const handleGetAllUrls = async (req, res) => {
  const urls = await getAllUrls(req)

  return res.render("home", { urls })
}
