import express from "express"
import path from "path"
import urlRoutes from "./routes/routes.js"
import { connectMongoDB } from "./connections/connection.js"

const app = express()

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))
app.use(express.static('./styles'));

export const PORT = 8001

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB Err:", err))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoutes)

app.listen(PORT, () =>
  console.log(`Server started at: http://localhost:${PORT}`)
)
