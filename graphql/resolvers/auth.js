import bcrypt from 'bcryptjs'
import User from '../../models/user'

export default {
  createUser: async args => {
    const existingUser = await User.findOne({ email: args.userInput.email })
    if (existingUser) {
      throw new Error('User with such email already exists.')
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
    const user = new User({
      email: args.userInput.email,
      password: hashedPassword
    })
    const newUser = await user.save()
    return {
      ...newUser._doc,
      password: null
    }
  }
}
