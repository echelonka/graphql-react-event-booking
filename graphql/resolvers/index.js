import bcrypt from 'bcryptjs'

import User from '../../models/user'
import Event from '../../models/event'
import Booking from '../../models/booking'

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => ({
      ...event._doc,
      creator: user.bind(this, event._doc.creator)
    }))
  } catch (err) {
    throw err
  }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId)
    return {
      ...event._doc,
      creator: user.bind(this, event._doc.creator)
    }
  } catch (err) {
    throw err
  }
}

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => ({
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator)
      }))
    } catch (err) {
      throw err
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => ({
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
      }))
    } catch (err) {
      throw err
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5d546bab77129545d422ae41'
    })
    let createdEvent

    try {
      const response = await event.save()
      createdEvent = {
        ...response._doc,
        date: new Date(response._doc.date).toISOString(),
        creator: user.bind(this, response._doc.creator)
      }
      const creator = await User.findById('5d546bab77129545d422ae41')
      if (!creator) {
        throw new Error('User not found.')
      }
      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent
    } catch (err) {
      throw err
    }
    
  },
  createUser: async args => {
    try {
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
    } catch (err) {
      throw err
    }
  },
  bookEvent: async args => {
    try {
      const event = await Event.findOne({ _id: args.eventId })
      const booking = new Booking({
        user: '5d546bab77129545d422ae41',
        event: event
      })
      const bookedEvent = await booking.save()
      return {
        ...bookedEvent._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(bookedEvent._doc.createdAt).toISOString(),
        updatedAt: new Date(bookedEvent._doc.updatedAt).toISOString()
      }
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = {
        ...booking.event._doc,
        creator: user.bind(this, booking.event._doc.creator)
      }
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) {
      throw err
    }
  }
}