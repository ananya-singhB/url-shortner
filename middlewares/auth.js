import { getUserWithSessionId } from "../service/authSessionId.js"

export const restrictToLoggedInUser = (req, res, next) => {
  const uuid = req?.cookies?.uid
  const user = uuid ? getUserWithSessionId(uuid) : null
  if (!uuid || !user) {
    return res.redirect("login")
  }

  req.user = user
  next()
}
