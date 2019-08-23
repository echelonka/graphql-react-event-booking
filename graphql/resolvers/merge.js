import Event from '../../models/event'
import User from '../../models/user'
import { dateToString } from '../../helpers/date'

const events = async eventIds => {
  const events = await Event.find({ _id: { $in: eventIds } })
  return events.map(event => transformEvent(event))
}

const transformEvent = event => ({
  ...event._doc,
  date: dateToString(event._doc.date),
  creator: user.bind(this, event._doc.creator)
})

const singleEvent = async eventId => transformEvent(await Event.findById(eventId))

const transformBooking = booking => ({
  ...booking._doc,
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt)
})

const user = async userId => {
  const user = await User.findById(userId)
  return {
    ...user._doc,
    createdEvents: events.bind(this, user._doc.createdEvents)
  }
}

export {
  user,
  singleEvent,
  transformEvent,
  transformBooking
}
