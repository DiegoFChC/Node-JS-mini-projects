const crypto = require('node:crypto')
const { hashPassword, comparePassword } = require('../utils/hashPassword')
const { validateEmail } = require('../utils/validateEmail')
const { validateEmailExists } = require('./storage.service')
const { readData, writeData } = require('./storage.service')
const { createJWT } = require('../utils/jwt')

async function createUser(data) {
  const users = await readData()
  const { email, password, admin, name, lastname } = data

  await validateEmailExists(email)

  const newUser = {
    id: crypto.randomUUID(),
    name,
    lastname,
    email,
    password: hashPassword(password),
    createdAt: new Date(),
    role: admin ? 'admin' : 'user',
  }
  users.push(newUser)
  await writeData(users)
  return {
    id: newUser.id,
    name: newUser.name,
    lastname: newUser.lastname,
    email: newUser.email,
    role: newUser.role,
  }
}

async function loginUser(data) {
  const { email, password } = data

  if (!validateEmail(email)) {
    throw new Error('Invalid email format')
  }

  const users = await readData()
  const user = users.find((user) => user.email === email)

  if (!user) throw new Error('Invalid credentials')

  if (!comparePassword(user.password, password))
    throw new Error('Invalid credentials')

  const token = createJWT({
    sub: user.id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })

  return { token }
}

module.exports = { createUser, loginUser }
