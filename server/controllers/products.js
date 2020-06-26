const { tokenValidation } = require("../utils/middleware")
const { info, error } = require("../utils/logger")

const Product = require("../models/products")
const productRouter = require("express").Router()

productRouter.get("/", async (request, response) => {
    //find all the products not flagged as deleted
    const products = await Product.find({ deleted: false })
    response.json(products.map(product => product.toJSON()))
})

productRouter.get("/:id", async (request, response) => {
    //find product
    const product = await Product.findById(request.params.id)
        .populate("user", { username: 1, id: 1 })
    //if there is no product or it has been flagged as deleted
    if (!product || product.deleted) return response.send(404).send({
        error: "product not found"
    })
    //send response
    response.json(product.toJSON())
})

productRouter.post("/", tokenValidation, async (request, response) => {
    //captures and validates if the fields are there
    const { name, description, userId } = request.body
    let { photos } = request.body
    if (!name || !description) return response.status(400).send({
        error: "some name or description field is missing"
    })
    if (!photos) photos = []

    //creates and fills the new product
    const product = new Product({
        name,
        description,
        user: userId,
        created_at: new Date,
        last_edited: new Date,
        deleted: false,
        photos,
    })

    //saves product
    await product.save((err, doc) => {
        if (err) {
            error(err.message)
            return response.status(500).send({
                error: err.message
            })
        }
        //logs and send the response
        info(`product ${name} saved!`)
        response.status(201).json(doc.toJSON())
    })

})

productRouter.put("/:id", tokenValidation, async (request, response) => {

    //captures necesary fields
    const {
        name,
        created_at,
        userId,
        description,
        photos,
    } = request.body
    if (!name || !created_at || !description) {
        response.status(400).send({ error: "some fields are missing" })
    }

    //finds the product
    const product = await Product.findById(id)
    if (!product) return response.status(404).send({
        error: "product not found"
    })

    //change product
    await Product.findByIdAndUpdate(id, {
        name,
        created_at,
        user: userId,
        description,
        photos,
        deleted: false,
        last_edited: new Date,
    },
        {
            new: true
        },
        (err, doc) => {
            //sends error
            if (err) {
                error(err.message)
                return response.status(500).send(err.message)
            }
            //sends response
            info(`product modified ${doc.name}`)
            response.json(doc.toJSON())
        }
    )
})

productRouter.delete("/:id", tokenValidation, async (request, response) => {

    //finds if there is product or has been flagged as deleted
    const id = request.params.id
    const product = await Product.findById(request.params.id)
    if (!product || product.deleted) return response.send(404).json({
        error: "product not found"
    })

    //flags the product as deleted and saves it
    Object.assign(product, { deleted: true })
    Product.findByIdAndUpdate(id, product, {}, async (err, doc) => {
        if (err) {
            error(err.message)
            return response.status(500).json({
                error: err.message
            })
        }
        info(`product ${doc.name} deleted!`)
        response.sendStatus(204)
    })
})

module.exports = productRouter