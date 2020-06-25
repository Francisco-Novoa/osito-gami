//imports
const Blog = require("../models/blogs")
const User = require("../models/users")
const { tokenValidation } = require("../utils/middleware")

//router creation
const blogRouter = require("express").Router()


blogRouter.get("/", async (request, response) => {
    blogs = await Blog.find({}).sort({ date: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)
        .populate("user", { username: 1, id: 1 })
    response.json(blog.toJSON())
})

blogRouter.post("/", tokenValidation, async (request, response) => {

    // captures and validates the existence of all the fields
    const { title, excerpt, userId, content } = request.body
    if (!title || !content) return (
        response.status(400).send({ error: "some fields are missing" })
    )

    //creates and fills the new blog
    const blog = new Blog({ title, content })
    Object.assign(blog, {
        user: userId,
        created_at: new Date,
        deleted: false
    })
    if (excerpt) Object.assign(blog, { excerpt })

    //saves BLog
    const savedBlog = await blog.save((err) => {
        if (err) {
            error(`error saving ${blog.title}, ${err.message}`)
            return response.status(500).send({
                error: "problem saving to the database"
            })
        }
    })

    //finds user and updates it
    user = await User.findById({ id: userId })
    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(userId, user)

    //sends the response
    response.send(201).json(savedBlog.toJSON())
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
    if (!title || !userId || !content || !created_at || !deleted) return (
        response.status(400).send({ error: "some fields are missing" })
    )

    //find the blog and verify if the user has the rights to change it.
    const blog = await Blog.findById(id)
    const user = await User.findById(userId)
    if (!blog) return response.status(404).send({ error: "blog not found" })
    if (blog.user.toString() !== user._id || !user.admin) return response.status(403)

    //change the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, {
        title,
        excerpt,
        content,
        created_at,
        deleted,
        lastEdited: new Date,
        user: userId
    },
        { new: true })

    //send the response
    response.json(updatedBlog.toJSON())

})

blogRouter.delete("/id", tokenValidation, async (request, response) => {
    //captures the ids
    const {userId}=request.body
    const id = request.params.id

    //find the blog and verify if the user has the rights to change it.
    const blog = await Blog.findById(id)
    const user = await User.findById(userId)
    if (!blog) return response.status(404).send({ error: "blog not found" })
    if (blog.user.toString() !== user._id || !user.admin) return response.status(403)

    //deletes blog
    await BlogfindByIdAndRemove(id)
    response.status(204).end()
})

module.exports = blogRouter