const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")
const { info, error } = require("../utils/logger")
const { tokenValidation } = require("../utils/middleware")

const User = require("../models/users")
const usersRouter = require("express").Router()



usersRouter.post("/", async (request, response) => {
    //check if there is password and username
    const { password, username } = request.body
    if (!password && !username) return response.status(400).send({
        error: "password or username missing"
    })

    //validate length, other validations can be added
    if (password.length < 8) return response.status(400).send({
        error: "password length at of least 8 characters"
    })
    if (username.length < 8) return response.status(400).send({
        error: "username length at of least 8 characters"
    })

    //password hashing and salting
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    //user saving
    const user = new User({ username, passwordHash })
    await user.save(async (err, user) => {
        if (err) {
            error(`error saving to database ${err.message}`)
            return response.status(500).send({
                error: "problem saving to the database"
            })
        }
        //logs the new user
        info(`user ${user.username} saved to database`)

        //creates the autentication token
        const preToken = {
            username: user.username,
            id: user._id,
        }
        const token = await jwt.sign(preToken, SECRET)

        //sends the response with the token
        response.status(201).send({ token, username: user.username })
    })
})

usersRouter.get("/", tokenValidation, async (request, response) => {
    const users = await User.find({})
        .populate("blogs", { title: 1 })
    response.json(users.map(elem => elem.toJSON()))
})

usersRouter.get("/:id", async (request, response) => {
    const users = await User.findById(request.params.id)
        .populate("blogs", { title: 1 })
    response.json(users.toJSON())
})

module.exports = usersRouter