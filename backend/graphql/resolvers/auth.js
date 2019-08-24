import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

export default {
  createUser: async ({ userInput }) => {
    const existingUser = await User.findOne({ email: userInput.email })
    if (existingUser) {
      throw new Error('User with such email already exists.')
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12)
    const user = new User({
      email: userInput.email,
      password: hashedPassword
    })
    const newUser = await user.save()
    return {
      ...newUser._doc,
      password: null
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('User does not exist.')

    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) throw new Error('Password is incorrect')

    const token = await jwt.sign({ userId: user.id, email: user.email }, 'somesupersecretkey', { expiresIn: '1h' })
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}
