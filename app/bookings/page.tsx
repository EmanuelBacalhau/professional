import { getAllBookingsByUser } from '@/_actions/get-all-bookings-by-user'
import { BookingItem } from '@/_components/booking-item'
import { BookingSummary } from '@/_components/booking-summary'
import { CancelBookingButton } from '@/_components/cancel-booking-button'
import { MapItem } from '@/_components/map-item'
import { PhoneItem } from '@/_components/phone-item'
import { Badge } from '@/_components/ui/badge'
import { Card, CardContent } from '@/_components/ui/card'
import { authOptions } from '@/_lib/auth'
import { format, isFuture } from 'date-fns'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const bookings = await getAllBookingsByUser(session.user.id)

  const bookingsConfirmed = bookings.filter((booking) => isFuture(booking.date))
  const bookingsFinalized = bookings.filter(
    (booking) => !isFuture(booking.date),
  )

  const booking = bookingsConfirmed[0] ? bookingsConfirmed[0] : null

  return (
    <div className="container p-5 lg:py-5">
      <div className="space-y-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="lg:grid lg:grid-cols-app-page lg:gap-10">
          <div className="space-y-6 lg:col-start-1">
            {bookingsConfirmed.length !== 0 && (
              <div className="space-y-3">
                <h1 className="uppercase text-muted-foreground">Próximos</h1>

                <div className="space-y-3">
                  {bookingsConfirmed.map(
                    ({
                      id,
                      date,
                      professionalService: { professional, name, price },
                    }) => (
                      <BookingItem
                        key={id}
                        booking={{
                          id,
                          date,
                          professionalService: {
                            professional,
                            name,
                            price: Number(price),
                          },
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {bookingsFinalized.length !== 0 && (
              <div className="space-y-3">
                <h1 className="uppercase text-muted-foreground">Finalizados</h1>

                <div className="space-y-3">
                  {bookingsFinalized.map(
                    ({
                      id,
                      date,
                      professionalService: { professional, name, price },
                    }) => (
                      <BookingItem
                        key={id}
                        booking={{
                          id,
                          date,
                          professionalService: {
                            professional,
                            name,
                            price: Number(price),
                          },
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden w-[440px] lg:block">
            {booking && (
              <Card className="mt-8 h-fit">
                <CardContent className="space-y-5 p-5">
                  <MapItem
                    professionalAddress={
                      booking.professionalService.professional.address
                    }
                    professionalName={
                      booking.professionalService.professional.name
                    }
                    professionalImageUrl={
                      booking.professionalService.professional.imageUrl
                    }
                  />

                  <div className="space-y-2 border-b border-solid pb-5">
                    <h3 className="text-sm font-bold">SOBRE NÓS</h3>

                    <p className="text-justify text-sm text-muted-foreground">
                      {booking.professionalService.professional.description}
                    </p>
                  </div>

                  <div className="space-y-2 border-b border-solid pb-5">
                    {booking.professionalService.professional.phones.map(
                      (phone, index) => (
                        <PhoneItem key={index} phone={phone} />
                      ),
                    )}
                  </div>

                  <Badge className="">
                    {isFuture(booking.date) ? 'Confirmada' : 'Finalizada'}
                  </Badge>

                  <BookingSummary
                    selectedDay={booking.date}
                    selectedTime={format(booking.date, 'HH:mm')}
                    service={{
                      name: booking.professionalService.name,
                      price: Number(booking.professionalService.price),
                    }}
                    professionalName={booking.professionalService.name}
                  />

                  <CancelBookingButton bookingId={booking.id} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {bookings.length === 0 && (
          <p className="text-center text-muted-foreground">
            Você não possui agendamentos.
          </p>
        )}
      </div>
    </div>
  )
}
export default Bookings
