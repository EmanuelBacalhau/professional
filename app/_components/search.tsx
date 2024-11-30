'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

const searchSchema = z.object({
  search: z.string().trim().min(1, {
    message: 'A busca deve conter ao menos 1 caractere',
  }),
})

export type SearchProps = z.infer<typeof searchSchema>

export const Search = () => {
  const router = useRouter()

  const form = useForm<SearchProps>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  function handleSearchClick(values: SearchProps) {
    return router.push(`/professional?title=${values.search}`)
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full gap-2"
        onSubmit={form.handleSubmit(handleSearchClick)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon color="white" />
        </Button>
      </form>
    </Form>
  )
}
