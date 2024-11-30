'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { deleteBooking } from '@/_actions/delete-booking'

interface CancelBookingButtonProps {
  bookingId: string
}

export const CancelBookingButton = ({
  bookingId,
}: CancelBookingButtonProps) => {
  async function handleCancelBooking() {
    deleteBooking(bookingId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Cancelar Reserva
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você quer cancelar sua reserva?</DialogTitle>

          <DialogDescription>
            Tem certeza que deseja fazer o cancelamento? Essa ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-row items-center justify-center gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Voltar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancelBooking}
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
