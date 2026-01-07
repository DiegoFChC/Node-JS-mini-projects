const { readData, writeData } = require('./storage.service')
const { JWT_BLACK_LIST } = require('./constants')

async function addToBlacklist(jti, exp) {
  const data = await readData(JWT_BLACK_LIST)
  data.push({ jti, expiresAt: exp })

  await writeData(JWT_BLACK_LIST, data)
}

async function isBlacklisted(jti) {
  const data = await readData(JWT_BLACK_LIST)
  const token = data.find(item => item.jti === jti)

  return token ? true : false
}

async function cleanupExpiredTokens() {
  const data = await readData(JWT_BLACK_LIST)
  const now = Date.now() / 1000
  const newData = data.filter(item => item.expiresAt > now)

  await writeData(JWT_BLACK_LIST, newData)
}

module.exports = {
  addToBlacklist,
  isBlacklisted,
  cleanupExpiredTokens
}