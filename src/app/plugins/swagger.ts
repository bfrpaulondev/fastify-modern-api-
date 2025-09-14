import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

export default fp(async (app) => {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(swagger, {
    openapi: {
      info: { title: 'Modern Fastify API (Mongo)', version: '1.0.0' },
      servers: [{ url: 'http://localhost:3000', description: 'dev' }]
    },
    transform: jsonSchemaTransform
  })

  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: true }
  })
})
