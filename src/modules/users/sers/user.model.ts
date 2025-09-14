import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, index: true }
  },
  { timestamps: true }
)

userSchema.index({ name: 1 })

export const UserModel = mongoose.model('User', userSchema)
