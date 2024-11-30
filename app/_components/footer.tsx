import { Card, CardContent } from './ui/card'

export const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="container px-5 py-6">
          <p className="text-sm text-muted-foreground">
            © 2024 Copyright <span className="font-bold">ACHA FÁCIL</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
