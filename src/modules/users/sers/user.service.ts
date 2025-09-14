import { UserModel } from './user.model.js'
import type { TUserCreate } from './user.schema.js'

export async function createUser(data: TUserCreate) {
  const doc = await UserModel.create(data)
  return toEntity(doc)
}

export async function listUsers() {
  const docs = await UserModel.find().sort({ _id: -1 }).limit(100).lean()
  return docs.map(toEntity)
}

function toEntity(d: any) {
  return {
    _id: String(d._id),
    name: d.name,
    email: d.email,
    createdAt: new Date(d.createdAt).toISOString(),
    updatedAt: new Date(d.updatedAt).toISOString()
  }
}
