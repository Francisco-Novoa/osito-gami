const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const { info } = require('../utils/logger')

// mongoose options
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0
}

mongoose.connect(MONGODB_URI, options)
const db = mongoose.connection

db.on('error', console.error.bind(console, `Mongodb Connection Error:  ${MONGODB_URI}` ))
db.once('open', () => {
    info('Mongodb Connection Successful')
})