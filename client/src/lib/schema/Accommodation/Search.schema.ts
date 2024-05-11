import { z } from "zod"

export const SearchSchema = z.object({
  address: z.string(),
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }),

  quantity: z.object({
    adult: z.number().optional(),
    child: z.number().optional(),
    pet: z.number().optional()
  })
})

export type SearchSchemaType = z.infer<typeof SearchSchema>
