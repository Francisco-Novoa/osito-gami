const { tokenValidation } = require("../utils/middleware")
const { info, error } = require("../utils/logger")

const User = require("../models/users")
const Blog = require("../models/blogs")
const blogRouter = require("express").Router()

blogRouter.get("/", async (request, response) => {
    //finds all the blogs that are not flagged as deleted
    blogs = await Blog.find({ deleted: false }).sort({ created_at: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get("/:id", async (request, response) => {
    //find blog
    const blog = await Blog.findById(request.params.id)
        .populate("user", { username: 1, id: 1 })
    //checks if there is no blog or if the blog has been flagged as deleted
    if (!product || product.deleted) return response.send(404).send({
        error: "blog not found"
    })
    //sends response
    response.json(blog.toJSON())
})

blogRouter.post("/", tokenValidation, async (request, response) => {
    // captures and validates the existence of all the fields
    const { title, userId, content } = request.body
    let { excerpt } = request.body
    if (!title || !content) return (response.status(400).send({
        error: "some name or title is missing"
    })
    )
    if (!excerpt) excerpt = null

    //creates and fills the new blog
    const blog = new Blog({
        title,
        content,
        user: userId,
        created_at: new Date,
        lastEdited: new Date,
        deleted: false,
        excerpt
    })

    //saves blog
    await blog.save(async (err, doc) => {
        if (err) {
            error(err.message)
            return response.status(500).send({
                error: err.message
            })
        }

        info(`blog ${blog.title} saved!`)

        //finds user and updates it
        const user = await User.findById(userId)
        user.blogs = [...user.blogs, blog.id]
        await User.findByIdAndUpdate(userId, user)

        //sends the response
        response.status(201).json(doc.toJSON())

    })

})

blogRouter.put("/:id", tokenValidation, async (request, response) => {

    //capture useful data and complain if some is missing
    const { title,
        excerpt,
        userId,
        content,
        created_at,
        deleted } = request.body
    const id = request.params.id
    if (!title || !content || !created_at) return (
        response.status(400).send({ error: "some fields are missing" })
    )

    //finds the blog
    const blog = await Blog.findById(id)
    if (!blog) return response.status(404).send({
        error: "blog not found"
    })

    //change the blog
    await Blog.findByIdAndUpdate(id, {
        title,
        excerpt,
        content,
        created_at,
        deleted,
        lastEdited: new Date,
        user: userId
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

            info(`blog modified ${doc.title}`)
            response.json(doc.toJSON())
        }
    )
})

blogRouter.delete("/id", tokenValidation, async (request, response) => {

    //find the product and checks if it has been flagged as deleted
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (!blog || blog.deleted) return response.status(404).send({
        error: "blog not found"
    })

    //deletes blog
    Object.assign(blog, { deleted: true })
    Blog.findByIdAndUpdate(id, blog, {}, (err, doc) => {
        if (err) {
            error(err.message)
            return response.status(500).json({
                error: err.message
            })
        }
        info(`blog ${doc.name} deleted!`)
        response.sendStatus(204)
    })
})

module.exports = blogRouter