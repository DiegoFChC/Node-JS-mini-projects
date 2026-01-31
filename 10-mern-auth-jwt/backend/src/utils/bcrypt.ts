import bcrypt from 'bcrypt'

export function hashValue(value: string, saltRound?: number) {
  return bcrypt.hash(value, saltRound || 10)
}

export async function compareValue(value: string, hashedValue: string) {
  return bcrypt.compare(value, hashedValue).catch(() => false)
}
