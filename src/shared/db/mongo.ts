import mongoose from 'mongoose'
import { env } from '../env.js'

export async function connectMongo() {
  mongoose.set('strictQuery', true)
  const conn = await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
  })
  return conn.connection
}

export async function disconnectMongo() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close()
  }
}
