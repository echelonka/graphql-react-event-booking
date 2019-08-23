import Event from '../../models/event'
import Booking from '../../models/booking'
import { transformEvent, transformBooking } from './merge'

export default {
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => transformBooking(booking))
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
      return transformBooking(bookedEvent)
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event)
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) {
      throw err
    }
  }
}
