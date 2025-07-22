const express = require("express")
const router = express.Router()

const controller = require("../controller/controller.js")
const middleware = require("../middleware/md.js")

router.get("/home", middleware.authenticateJWT ,controller.homePage)
router.get("/signup", controller.getSignup)
router.get("/signin", controller.getSignin)
router.post("/signup", controller.signup)
router.post("/signin", controller.signin)

module.exports = router