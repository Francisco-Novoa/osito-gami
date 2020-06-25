const mongoose = require("mongoose")
const uniqueValidator = require ("mongoose-unique-validator")

const blogSchema =  mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    created_at:{
        type:Date,
        index:true,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    excerpt:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
    deleted:{
        type:Boolean,
    },
    lastEdited:{
        type:Date
    }

})

blogSchema.plugin(uniqueValidator)

blogSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.deleted
    }
})

const Blog = mongoose.model("Blogs",blogSchema)

module.exports = Blog
