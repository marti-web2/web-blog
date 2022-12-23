import User from "../model/User"

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
      const user = new User({
        name,
        email,
        password,
      })
      await user.save()
      return res.status(201).json({ message: "User created!" })
    }
  } catch (error) {
    return res.status(500).json({ message: "User creation failed!" })
  }
  return res.status(422).json({ message: "User already exists! Login instead." })
}