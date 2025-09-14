import fp from 'fastify-plugin'
export default fp(async (app) => {
  app.get('/health', {
    schema: { response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }
  }, async () => ({ ok: true }))
})
