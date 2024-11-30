import { db } from './_lib/prisma'

import Image from 'next/image'

import { compareDesc } from 'date-fns'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { getAllBookingsByUser } from './_actions/get-all-bookings-by-user'
import { ProfessionalSection } from './_components/professional-section'
import { BookingSlideList } from './_components/booking-slide-list'
import { Search } from './_components/search'
import { Button } from './_components/ui/button'
import { Welcome } from './_components/welcome'
import { quickSearchOptions } from './_constants/search'
import { authOptions } from './_lib/auth'

async function getProfessional() {
  const professionals = await db.professional.findMany()

  return professionals
}

async function getPopularesProfessional() {
  const professionals = await db.professional.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return professionals
}

const Home = async () => {
  const session = await getServerSession(authOptions)
  const professionals = await getProfessional()
  const popularesProfessionals = await getPopularesProfessional()

  const bookings = session && (await getAllBookingsByUser(session.user.id))

  const bookingsFormatted = !bookings
    ? []
    : bookings
        ?.map((booking) => ({
          ...booking,
          professionalService: {
            ...booking.professionalService,
            price: Number(booking.professionalService.price),
          },
        }))
        .sort((a, b) => compareDesc(a.date, b.date))

  return (
    <div>
      <div className="container relative hidden justify-center px-32 py-16 md:flex lg:h-[460px]">
        <Image
          src="/background-screen-lg.jpg"
          fill
          objectFit="cover"
          className="opacity-30 grayscale filter"
          alt="teste"
        />

        <div className="z-10 w-full md:flex md:flex-col md:gap-4 lg:grid lg:grid-cols-2 lg:flex-row lg:gap-32">
          <div className="space-y-3 md:w-full lg:w-[440px]">
            <Welcome userName={session?.user?.name} />

            <Search />

            <BookingSlideList bookings={bookingsFormatted} />
          </div>

          <div className="md:w-full lg:max-w-[617px]">
            <ProfessionalSection
              professional={professionals}
              title="Recomendados"
            />
          </div>
        </div>
      </div>

      <div className="container space-y-3 p-5">
        <div className="space-y-3 md:hidden">
          <Welcome userName={session?.user?.name} />

          <Search />

          <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map(({ imageUrl: Icon, title }) => (
              <Button key={title} className="gap-2" variant="outline" asChild>
                <Link href={`/professional?service=${title}`}>
                  <Icon />
                  {title}
                </Link>
              </Button>
            ))}
          </div>

          <BookingSlideList bookings={bookingsFormatted} />

          <ProfessionalSection
            professional={professionals}
            title="Recomendados"
          />
        </div>

        <ProfessionalSection professional={professionals} title="Populares" />

        <ProfessionalSection
          professional={popularesProfessionals}
          title="Mais visitados"
        />
      </div>
    </div>
  )
}

export default Home
