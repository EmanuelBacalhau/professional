import type { Booking } from '@/_dtos/booking'
import { BookingItem } from './booking-item'

interface BookingItemProps {
  bookings: Booking[]
}

export const BookingSlideList = ({ bookings }: BookingItemProps) => {
  return (
    <div>
      {bookings.length !== 0 && (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase text-muted-foreground lg:text-sm">
            Seus Agendamentos
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {bookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={{
                  id: booking.id,
                  date: booking.date,
                  professionalService: {
                    name: booking.professionalService.name,
                    price: Number(booking.professionalService.price),
                    professional: {
                      name: booking.professionalService.professional.name,
                      imageUrl:
                        booking.professionalService.professional.imageUrl,
                      address: booking.professionalService.professional.address,
                      phones: booking.professionalService.professional.phones,
                    },
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
