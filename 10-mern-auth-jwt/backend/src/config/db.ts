import mongoose from 'mongoose'
import { MONGO_URI } from '../constants/env'

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Successfully conected to DB')
  } catch (error) {
    console.log('Could not connect to database', error)
    process.exit(1)
  }
}
