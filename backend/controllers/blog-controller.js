import Blog from "../model/Blog"

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
  const blog = new Blog({
    title,
    description,
    image,
    user
  })
  try {
    await blog.save()
    return res.status(201).json({ blog })
  } catch (error) {
    return res.status(409).json({ message: "Blog not saved!" })
  }
}