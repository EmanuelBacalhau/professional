'use client'

import type { Professional } from '@prisma/client'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

interface ProfessionalItemProps {
  professional: Professional
}

export const ProfessionalItem = ({ professional }: ProfessionalItemProps) => {
  return (
    <Card className="w-full min-w-[220px]">
      <CardContent className="p-1">
        <div className="relative h-[160px] w-full">
          <Image
            fill
            className="rounded-md object-cover"
            alt="Imagem da barbearia"
            src={professional.imageUrl}
          />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant={'secondary'}
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="mt-2">
          <h3 className="truncate font-semibold">{professional.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {professional.address}
          </p>

          <Button variant={'secondary'} className="mt-3 w-full" asChild>
            <Link href={`/professional/${professional.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
