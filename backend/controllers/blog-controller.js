import mongoose from "mongoose"
import Blog from "../model/Blog.js"
import User from "../model/User.js"

export const getAllBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find()
    return res.status(200).json({ blogs })
  } catch (error) {
    return res.status(404).json({ message: "No blogs found!" })
  }
}

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body

  let existingUser
  try {
    existingUser = await User.findById(user)
  } catch (error) {
    return res.status(500).json({ message: "Blog creation failed!" })
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User with this ID was not found!" })
  }
  const blog = new Blog({
    title,
    description,
    image,
    user
  })
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({ session })
    existingUser.blogs.push(blog)
    await existingUser.save({ session })
    await session.commitTransaction()
    return res.status(200).json({ blog })
  } catch (error) {
    console.log(error)
    return res.status(409).json({ message: "Blog not saved!" })
  }
}

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogId = req.params.id
  let updateData = { title, description }
  if (req.body.image) { updateData.image = req.body.image }
  let blog
  try {
    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
    return res.status(201).json({ blog })
  } catch (error) {
    return res.status(409).json({ message: "Blog not updated!" })
  }
}

export const getById = async (req, res, next) => {
  const id = req.params.id
  let blog
  try {
    blog = await Blog.findById(id)
    return res.status(200).json({ blog })
  } catch (err) {
    return res.status(404).json({ message: "Blog not found!" })
  }
}

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id
  try {
    const blog = await Blog.findByIdAndRemove(blogId).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" })
    }
    return res.status(200).json({ message: "Blog deleted!" })
  } catch (error) {
    return res.status(500).json({ message: "Blog not deleted!" })
  }
}

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id
  let userBlogs
  try {
    userBlogs = await User.findById(userId).populate('blogs')
    return res.status(200).json({ blogs: userBlogs.blogs })
  } catch (err) {
    return res.status(404).json({ message: "Blog not found!" })
  }
}
