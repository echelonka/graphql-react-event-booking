import Event from '../../models/event'
import User from '../../models/user'
import { transformEvent } from './merge'

export default {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => transformEvent(event))
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
      createdEvent = transformEvent(response)
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
  }
}