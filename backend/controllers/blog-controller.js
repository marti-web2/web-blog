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