export type Booking = {
  id: string
  date: Date
  professionalService: {
    name: string
    price: number
    professional: {
      name: string
      imageUrl: string
      address: string
      phones: string[]
    }
  }
}
