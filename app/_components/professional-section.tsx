import type { Professional } from '@prisma/client'
import { ProfessionalItem } from './professional-item'

interface ProfessionalSectionProps {
  title: string
  professional: Professional[]
}

export const ProfessionalSection = ({
  title,
  professional,
}: ProfessionalSectionProps) => {
  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase text-muted-foreground lg:text-base">
        {title}
      </h2>

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {professional.map((professional) => (
          <ProfessionalItem key={professional.id} professional={professional} />
        ))}
      </div>
    </div>
  )
}
