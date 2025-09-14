import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().url()
})

export const env = schema.parse(process.env)
