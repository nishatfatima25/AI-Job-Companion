const express = require("express")
const cookieParser = require("cookie-parser") //middleware for token blacklisting
const app = express()

app.use(express.json())
app.use(cookieParser())

//it requires all the routes here
const authRouter = require("./routes/auth.routes")

//then all the routes will be used here
app.use("/api/auth", authRouter)
module.exports = app 