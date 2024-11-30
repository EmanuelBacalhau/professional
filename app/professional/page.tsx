import { ProfessionalItem } from '@/_components/professional-item'
import { Search } from '@/_components/search'
import { db } from '@/_lib/prisma'

interface ProfessionalPageProps {
  searchParams: {
    service?: string
    title?: string
  }
}

async function getProfessionalBySearch({
  searchParams,
}: ProfessionalPageProps) {
  if (searchParams.title) {
    const response = await db.professional.findMany({
      where: {
        name: {
          contains: searchParams.title,
          mode: 'insensitive',
        },
      },
    })

    return response
  } else if (searchParams.service) {
    const response = await db.professionalService.findMany({
      where: {
        name: {
          contains: searchParams.service,
          mode: 'insensitive',
        },
      },
      select: {
        professional: true,
      },
    })

    return response.map((item) => item.professional)
  } else {
    return []
  }
}

const ProfessionalPage = async ({ searchParams }: ProfessionalPageProps) => {
  const professionals = await getProfessionalBySearch({ searchParams })

  return (
    <div>
      <div className="container py-5">
        <div className="lg:hidden">
          <Search />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
          Resultado para: &quot;{searchParams.title || searchParams.service}
          &quot;
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {professionals.map((professional) => (
            <ProfessionalItem
              key={professional.id}
              professional={professional}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProfessionalPage
