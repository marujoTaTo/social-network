require("dotenv").config()

const bcrypt = require("bcrypt")
const path = require("path")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()



let users = require("../db/db.js")

const homePage = (req, res) => {
    return res.sendFile((path.join(__dirname, "../../frontend/home.html")))
}

const signup = async (req, res) => {
    const [username, pwd] = req.body
    const userExist = users.find(u => u.username === username)

    if(userExist) return res.status(501).json({ massage: "Esse nome de usuário já existe"})

    const id = Date.now()
    const pwdHash = await bcrypt.hash(pwd, 10)
    const newUser = {username: username, password: pwdHash, id: id}

    users.push(newUser)

    return res.status(201).json({ message: "Usuário criado"})
}

const getSignup = (req, res) => {
    return res.sendFile(path.join(__dirname, "../../frontend/login/signup.html"))
}

const signin = async (req, res) => {
    const [username, pwd] = req.body

    const user = users.find(u => u.username === username)
    const passOk = await bcrypt.compare(pwd, user.password)

    if(!user || !passOk) {
        return res.status(401).json({ message: "Usuário nao encontrado ou Crendencias invalidas"})
    }

    const payload = { username: user.username, id: user.id }
    const secretKey = process.env.JWT_SECRET

    const token = jwt.sign( payload, secretKey, {expiresIn: "1m"} )
    return res.status(201).json({ token })
}

const getSignin = (req, res) => {
    return res.sendFile(path.join(__dirname, "../../frontend/login/signin.html"))
}

const setCookie = (req, res, next) => {
    const secret = "secretTest"
    const options = {}

    cookieParser(secret, )
    const lifeTime = 60
    res.cookie("token", "", { maxAge: lifeTime} )
    res.status(200).json({ message: "Cookie criado" })        
}


module.exports = { homePage, signup, getSignup, signin, getSignin, setCookie }