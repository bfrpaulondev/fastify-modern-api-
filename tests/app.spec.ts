import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectMongo, disconnectMongo } from '../src/shared/db/mongo.js'
import { buildServer } from '../src/app/server.js'

let app: Awaited<ReturnType<typeof buildServer>>
let mongod: MongoMemoryServer

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongod.getUri()
  await connectMongo()
  app = await buildServer()
  await app.ready()
})

afterAll(async () => {
  await disconnectMongo()
  await mongod.stop()
})

describe('app', () => {
  it('GET /health -> 200', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' })
    expect(res.statusCode).toBe(200)
  })

  it('POST /users -> 201', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/users',
      payload: { name: 'Bruno', email: 'bruno@example.com' }
    })
    expect(res.statusCode).toBe(201)
  })
})
