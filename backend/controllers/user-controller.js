import User from "../model/User"

const getAllUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

  if (!users) {
    return res.status(404).json({ message: "No users found!" })
  }

  // return response.status(200).json({ users })
  return response.status(200).json({ users:users })
}