'use server'

import { authOptions } from '@/_lib/auth'
import { db } from '@/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

interface GetBookingProps {
  professionalId: string
  date: Date
}

export async function getBookings({ professionalId, date }: GetBookingProps) {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error('Unauthorized')
  }

  const bookings = await db.booking.findMany({
    where: {
      professionalService: {
        professionalId,
      },
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  revalidatePath('/bookings')

  return bookings
}
