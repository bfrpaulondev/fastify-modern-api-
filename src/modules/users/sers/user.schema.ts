import { z } from 'zod'

export const UserCreate = z.object({
  name: z.string().min(2),
  email: z.string().email()
})

export const UserEntity = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type TUserCreate = z.infer<typeof UserCreate>
