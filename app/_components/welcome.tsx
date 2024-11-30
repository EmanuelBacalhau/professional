import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface WelcomeProps {
  userName: string | null | undefined
}

export const Welcome = ({ userName }: WelcomeProps) => {
  const currentDate = new Date()

  return (
    <div>
      <h2 className="text-xl font-bold">
        Olá, {userName ? userName?.split(' ')[0] : 'bem vindo'}!
      </h2>
      <p>
        <span className="capitalize">
          {format(currentDate, 'EEEE', {
            locale: ptBR,
          })}
        </span>
        , <span>{format(currentDate, 'dd')}</span>
        {' de '}
        <span className="capitalize">
          {format(currentDate, 'MMMM', {
            locale: ptBR,
          })}
        </span>
      </p>
    </div>
  )
}
