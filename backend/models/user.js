import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
})

export default model('User', userSchema)
