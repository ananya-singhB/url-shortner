import { v4 as uuidv4 } from "uuid"
import User from "../models/user.js"
import { setSessionId } from "../service/authSessionId.js"

export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body

  await User.create({ name, email, password })

  return res.redirect("/")
}

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password){
    return res.render("login", { error: "Both email and password are required." })
  }
  
  const user = await User.findOne({ email, password })

  if (!user) {
    return res.render("login", { error: "Invalid username or password." })
  }

  const sessionId = uuidv4()
  setSessionId(sessionId, user)
  res.cookie("uid", sessionId);
  return res.redirect("/")
}
