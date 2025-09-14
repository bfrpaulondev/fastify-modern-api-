import { buildServer } from './server.js'
import { env } from '../shared/env.js'
import { connectMongo, disconnectMongo } from '../shared/db/mongo.js'

let app: Awaited<ReturnType<typeof buildServer>>

async function bootstrap() {
  try {
    await connectMongo()
    app = await buildServer()
    await app.ready()
    app.swagger()
    await app.listen({ port: env.PORT, host: '0.0.0.0' })
    app.log.info(`HTTP server on ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()

process.on('SIGINT', async () => { await disconnectMongo(); await app.close(); process.exit(0) })
process.on('SIGTERM', async () => { await disconnectMongo(); await app.close(); process.exit(0) })
