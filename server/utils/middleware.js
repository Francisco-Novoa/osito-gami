const { error, info } = require('./logger')
const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")

const requestLogger = (request, response, next) => {
    //logs a few fields into the console
    info('-----')
    info('Method: ', request.method)
    info('Path: ', request.path)
    info('Body: ', request.body)
    info('-----')
    next()
}

const errorHandler = (err, request, response) => {

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    error(err.message)
    next()
}

const unknownEndpoint = (request, response) => {
    info("-----")
    info("unknown endpoint")

    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenValidation = (request, response, next) => {

    //check if a token was sent
    const header = request.get("authorization")
    if (!header) return response.sendStatus(401)

    //validation and the username and id are sent along
    const token = header.split(" ")[1]
    const { username, id } = jwt.verify(token, SECRET)
    Object.assign(request.body, { username, userId: id })
    next()
}


module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
    tokenValidation,
}