'use server'

import { db } from '@/_lib/prisma'

export async function getAllBookingsByUser(userId: string) {
  const bookings = await db.booking.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      date: true,
      professionalService: {
        select: {
          name: true,
          price: true,
          professional: {
            select: {
              name: true,
              imageUrl: true,
              address: true,
              phones: true,
              description: true,
            },
          },
        },
      },
    },
  })

  return bookings
}
