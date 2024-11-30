import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'

interface MapItemProps {
  professionalName: string
  professionalImageUrl: string
  professionalAddress: string
}

export const MapItem = ({
  professionalAddress,
  professionalName,
  professionalImageUrl,
}: MapItemProps) => {
  return (
    <div className="relative flex h-[180px] w-full items-end overflow-hidden rounded-md px-3 pb-3">
      <Image
        src="/map.png"
        alt={`Mapa da barbearia ${professionalName}`}
        fill
        className="object-cover"
      />

      <Card className="z-50 w-full overflow-hidden rounded-md border-none">
        <CardContent className="flex items-center gap-3 px-5 py-3">
          <Avatar>
            <AvatarImage src={professionalImageUrl} />
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold">{professionalName}</h3>
            <h3 className="max-w-[140px] truncate text-xs">
              {professionalAddress}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
