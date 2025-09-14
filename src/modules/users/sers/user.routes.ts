import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { UserCreate, UserEntity } from './user.schema.js'
import { createUser, listUsers } from './user.service.js'

export default async function routes(app: FastifyInstance) {
  app.get('/users', {
    schema: { response: { 200: z.array(UserEntity) } }
  }, async () => listUsers())

  app.post('/users', {
    schema: { body: UserCreate, response: { 201: UserEntity } }
  }, async (req, reply) => {
    const created = await createUser(req.body as { name: string; email: string })
    return reply.code(201).send(created)
  })

  // rota pura para benchmark (sem DB)
  app.get('/ping', {
    schema: { response: { 200: z.object({ pong: z.string() }) } }
  }, async () => ({ pong: 'ok' }))
}
