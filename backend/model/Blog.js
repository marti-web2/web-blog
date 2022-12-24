import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  user:{ type: String, required: true },
})

// const userId = mongoose.model.find({ user: req.params.id })
// console.log(userId)

export default mongoose.model("Blog", blogSchema)