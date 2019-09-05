import Event from '../../models/event'
import Booking from '../../models/booking'
import { transformEvent, transformBooking } from './merge'
import { errorName } from '../../helpers/constants'

export default {
  bookings: async (args, req) => {
    if (!req.isAuth) throw new Error(errorName.UNAUTHORIZED)

    const bookings = await Booking.find()
    return bookings.map(booking => transformBooking(booking))
  },

  bookEvent: async ({ eventId }, req) => {
    if (!req.isAuth) throw new Error(errorName.UNAUTHORIZED)

    const event = await Event.findOne({ _id: eventId })
    const booking = new Booking({
      user: req.userId,
      event: event
    })
    const bookedEvent = await booking.save()
    return transformBooking(bookedEvent)
  },

  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) throw new Error(errorName.UNAUTHORIZED)

    const booking = await Booking.findById(bookingId).populate('event')
    const event = transformEvent(booking.event)
    await Booking.deleteOne({ _id: bookingId })
    return event
  }
}
