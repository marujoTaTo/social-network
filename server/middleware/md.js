require("dotenv").config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const express = require("express")
const app = express()

const authenticateJWT =  (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({ error: "Token não fornecido"});

    const [schema, token ] = authHeader.split(" ")

    if(schema !== "Bearer" || !token) return res.status(401).json({ error: "Formato Inválido"});

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) return res.status(403).json({ error:"Token invalido ou expirado"})

        req.user = {id:payload.id, username: payload.username}

        next()
    })
} 

module.exports = { authenticateJWT }