const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    created_at: {
        type: Date,
        required: true
    },
    lastEdited: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
    },
    photos: [{
        type: String,
    }],
    deleted: {
        type: Boolean
    }
})

productSchema.plugin(uniqueValidator)

productSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.deleted
    }
})
const Product = mongoose.model("Products", productSchema)

module.exports = Product