import { MapItem } from '@/_components/map-item'
import { PhoneItem } from '@/_components/phone-item'
import { ServiceItem } from '@/_components/service-item'
import { Card, CardContent } from '@/_components/ui/card'
import { DAYS_OF_WEEK } from '@/_constants/days-of-week'
import { db } from '@/_lib/prisma'
import { MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ProfessionalPageProps {
  params: {
    id: string
  }
}

async function getProfessionalDetails(id: string) {
  const professional = await db.professional.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })

  return professional
}

const ProfessionalPage = async ({ params }: ProfessionalPageProps) => {
  const professionals = await getProfessionalDetails(params.id)

  if (!professionals) {
    return notFound()
  }

  return (
    <div>
      <div className="container hidden lg:grid lg:grid-cols-app-page lg:gap-10 lg:p-5">
        <div>
          <div className="relative h-[487px]">
            <Image
              src={professionals?.imageUrl}
              fill
              className="rounded-md object-cover"
              alt={professionals.name}
            />
          </div>

          <div className="mt-5 flex justify-between">
            <div>
              <h1 className="mb-3 text-3xl font-bold">{professionals.name}</h1>

              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{professionals.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-md bg-gray-900 px-5 py-2">
              <div className="flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={20} />
                <p className="text-xl">5,0</p>
              </div>

              <p>(499 avaliações)</p>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <h2 className="font-bold uppercase text-muted-foreground">
              Serviços
            </h2>

            <div className="lg:container lg:grid lg:grid-cols-2 lg:gap-3 lg:p-0">
              {professionals.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  professional={professionals}
                  service={service}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="h-fit">
          <CardContent className="w-[386px] space-y-5 p-5">
            <MapItem
              professionalAddress={professionals.address}
              professionalName={professionals.name}
              professionalImageUrl={professionals.imageUrl}
            />

            <div className="space-y-2 border-b border-solid pb-5">
              <h3 className="text-sm font-bold">SOBRE NÓS</h3>

              <p className="text-justify text-sm text-muted-foreground">
                {professionals.description}
              </p>
            </div>

            <div className="space-y-2 border-b border-solid pb-5">
              {professionals.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>

            <div className="space-y-2 border-b border-solid pb-5">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day.day} className="flex justify-between text-sm">
                  <p className="text-muted-foreground">{day.day}</p>
                  <p>{day.hours}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-sm">Em parceira com</h3>

              <Image
                src={'/logo.png'}
                alt="FSW Barber"
                width={133}
                height={22}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src={professionals?.imageUrl}
          fill
          className="object-cover"
          alt={professionals.name}
        />
      </div>

      <div className="border-b border-solid p-5 lg:hidden">
        <h1 className="mb-3 text-xl font-bold">{professionals.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{professionals.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5 lg:hidden">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{professionals.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5 lg:hidden">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Serviços
        </h2>
        {professionals.services.map((service) => (
          <ServiceItem
            key={service.id}
            professional={professionals}
            service={service}
          />
        ))}
      </div>

      <div className="space-y-3 p-5 lg:hidden">
        {professionals.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default ProfessionalPage
