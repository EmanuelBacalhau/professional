import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent } from './ui/card'

interface BookingSummaryProps {
  service: {
    name: string
    price: number
  }
  selectedDay: Date
  selectedTime: string
  professionalName: string
}

export const BookingSummary = ({
  selectedDay,
  selectedTime,
  service,
  professionalName,
}: BookingSummaryProps) => {
  const dayFormatted = format(selectedDay as Date, "dd 'de' MMMM", {
    locale: ptBR,
  })

  const priceFormatted = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(service.price))

  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold">{service.name}:</h2>
          <p className="text-sm font-bold">{priceFormatted}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm text-muted-foreground">Data:</h2>
          <p className="text-sm text-muted-foreground">{dayFormatted}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm text-muted-foreground">Horário:</h2>
          <p className="text-sm text-muted-foreground">{selectedTime}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm text-muted-foreground">Empresa:</h2>
          <p className="truncate text-sm text-muted-foreground">
            {professionalName}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
