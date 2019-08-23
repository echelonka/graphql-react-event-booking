import Event from '../../models/event'
import User from '../../models/user'
import { dateToString } from '../../helpers/date'

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => transformEvent(event))
  } catch (err) {
    throw err
  }
}

const transformEvent = event => ({
  ...event._doc,
  date: dateToString(event._doc.date),
  creator: user.bind(this, event._doc.creator)
})

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId)
    return transformEvent(event)
  } catch (err) {
    throw err
  }
}

const transformBooking = booking => ({
  ...booking._doc,
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt)
})

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

export {
  user,
  singleEvent,
  transformEvent,
  transformBooking
}
