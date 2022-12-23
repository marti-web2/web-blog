import express from "express"
import mongoose from "mongoose"
require('dotenv').config()

const app = express()
const PORT = 5000
const mongoKey = process.env.MONGO_KEY

mongoose.connect(
  `mongodb+srv://marti:${mongoKey}@cluster0.4k3mknc.mongodb.net/Blog?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, useUnifiedTopology: true 
  })
.then(() => app.listen(PORT))
.then(() => console.log(`Connected to Database and listening to LocalHost:${PORT}`))
.catch((err) => console.log(err))

app.use("/", (req,res,next) => {
  res.send("Hello World")
})

app.listen(PORT)