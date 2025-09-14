# Fastify Modern API (Mongo + TS + Zod + Swagger)

Template base para APIs modernas em Node.js:
- Fastify v4, TypeScript, Zod v3
- Swagger (/docs) gerado pelos schemas Zod
- MongoDB (Mongoose)
- Testes (Vitest + MongoMemoryServer)
- Benchmark (autocannon)

## Setup
```bash
cp .env.example .env
docker compose up -d      # opcional para Mongo local
npm ci
npm run dev               # http://localhost:3000/docs
