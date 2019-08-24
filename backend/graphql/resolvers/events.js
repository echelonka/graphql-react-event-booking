import Event from '../../models/event'
import User from '../../models/user'
import { transformEvent } from './merge'

export default {
  events: async () => {
    const events = await Event.find()
    return events.map(event => transformEvent(event))
  },

  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const event = new Event({
      creator: req.userId,
      date: new Date(eventInput.date),
      description: eventInput.description,
      price: +eventInput.price,
      title: eventInput.title
    })
    const createdEvent = transformEvent(await event.save())
    const creator = await User.findById(req.userId)

    if (!creator) throw new Error('User not found.')

    creator.createdEvents.push(event)
    await creator.save()
    return createdEvent
  }
}
