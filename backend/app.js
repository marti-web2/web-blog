import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 5000
const mongoPassword = process.env.MONGO_PASSWORD

mongoose.connect(
  `mongodb+srv://marti:${mongoPassword}@cluster0.4k3mknc.mongodb.net/?retryWrites=true&w=majority`
  )
.then(() => app.listen(PORT))
.then(() => console.log(`Connected to Database and listening to LocalHost:${PORT}`))
.catch((err) => console.log(err))