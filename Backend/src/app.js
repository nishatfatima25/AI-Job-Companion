const express = require("express")
const cookieParser = require("cookie-parser") //middleware for token blacklisting
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

//it requires all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

//then all the routes will be used here
app.use("/api/auth", authRouter)
app.use("/api/interview",interviewRouter)

module.exports = app 