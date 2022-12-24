import User from "../model/User"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(404).json({ message: "No users found!" })
  }
}

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ email })
    // asynchronously create a new user if it doesn't exist
    if (!existingUser) {
      const hashedPassword = await bcrypt.hashSync(password, 12)
      const user = new User({
        name,
        email,
        password: hashedPassword,
      })
      await user.save()
      return res.status(201).json({ message: "User created!" })
    }
  } catch (error) {
    return res.status(500).json({ message: "User creation failed!" })
  }
  return res.status(422).json({ message: "User already exists! Login instead." })
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({ message: "User with this email was not found!" })
    }
  } catch(error) {
    return res.status(500).json({ message: "Login failed!" })
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials!" })
  }

  return res.status(200).json({ message: "Logged in was successful!" })
}

/* Consider using a specialized library or service for handling user authentication and authorization, 
such as Passport.js or Auth0. */