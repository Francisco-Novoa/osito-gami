const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { SECRET } = require("../utils/config")
const { info } = require("../utils/logger")

const loginRouter = require("express").Router()
const User = require("../models/users")

loginRouter.post("/", async (request, response) => {

    //catchs the username and password
    const { username, password } = request.body
    if (!username || !password) return response.status(401).json({
        error: "password or username missing"
    })

    //search if the username is in the database
    const user = await User.findOne({ username: username })
    if (!user) return response.status(401).json({
        error: "password or username invalid"
    })

    //compares the password to the hash
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return response.status(401).json({
        error: "password or username invalid"
    })

    //creates the autentication token
    const preToken = {
        username: user.username,
        id: user._id,
    }
    info(`user ${username} has logged in`)
    const token = jwt.sign(preToken, SECRET)
    response.send({ token, username: user.username, })

})

module.exports= loginRouter
