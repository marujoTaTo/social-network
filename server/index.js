const express = require("express")
const bcrypt = require("bcrypt")
const path = require("path")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const app = express()

require("dotenv").config()

const router = require("./routers/router.js")

app.use(router)
app.use(cookieParser())

app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend")))


app.listen(3000, () => {
    console.log("Server running at port 3000")
})