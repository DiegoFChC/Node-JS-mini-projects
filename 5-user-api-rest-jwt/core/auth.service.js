const crypto = require('node:crypto')
const { hashPassword, comparePassword } = require('../utils/hashPassword')
const { validateEmail } = require('../utils/validateEmail')
const { validateEmailExists } = require('./storage.service')
const { readData, writeData } = require('./storage.service')
const { createJWT } = require('../utils/jwt')
const { createRefreshToken } = require('../utils/refreshToken')
const { saveRefreshToken } = require('./refreshTokens.service')
const { USERS_DATA_PATH } = require('./constants')

async function createUser(data) {
  const users = await readData(USERS_DATA_PATH)
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
  await writeData(USERS_DATA_PATH, users)
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

  const users = await readData(USERS_DATA_PATH)
  const user = users.find((user) => user.email === email)

  if (!user) throw new Error('Invalid credentials')

  if (!comparePassword(user.password, password))
    throw new Error('Invalid credentials')

  const accessToken = createJWT({
    sub: user.id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })

  const { newRefreshToken, token } = createRefreshToken(user.id)
  await saveRefreshToken(newRefreshToken)

  return { accessToken, refreshToken: token }
}

module.exports = { createUser, loginUser }
