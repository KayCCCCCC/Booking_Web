import { z } from "zod"

const GGAccount = z.object({
  email: z.string().nullable(),
  name: z.string().nullable(),
  avatar: z.string().url().nullable()
})

export type GGAccountType = z.infer<typeof GGAccount>
