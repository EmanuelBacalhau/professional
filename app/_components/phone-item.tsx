'use client'

import { SmartphoneIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const { toast } = useToast()

  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
    toast({
      title: 'Número copiado',
      description: `O número ${phone} foi copiado para a área de transferência.`,
    })
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
