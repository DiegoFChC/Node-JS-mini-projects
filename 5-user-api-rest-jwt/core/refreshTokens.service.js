const { readData, writeData } = require('./storage.service')
const { REFRESH_TOKENS_PATH } = require('./constants')
const { compareHash } = require('../utils/refreshToken')

async function saveRefreshToken(tokenData) {
  try {
    const data = await readData(REFRESH_TOKENS_PATH)
    data.push(tokenData)
    
    await writeData(REFRESH_TOKENS_PATH, data)
  } catch (err) {
    throw new Error(err.message)
  }
}

async function findRefreshTokenByHash(token) {
  try {
    const data = await readData(REFRESH_TOKENS_PATH)
    const refreshToken = data.find(item => compareHash(item.tokenHash, token))

    if(!refreshToken) throw new Error('RefreshToken does not exists')
    const now = Math.floor(Date.now() / 1000)
    if (refreshToken.expiresAt < now) {
      revokeRefreshToken(refreshToken.id)
      throw new Error('RefreshToken has expired')
    }
    if (refreshToken.revoked) {
      await revokeAllUserTokens(refreshToken.userId)
      throw new Error('Attempted reuse detected. Security compromised.')
    }
    
    return refreshToken
  } catch (err) {
    throw new Error(err.message)
  }
}

async function findRefreshTokenForLogout(token) {
  const data = await readData(REFRESH_TOKENS_PATH)

  return data.find(item => compareHash(item.tokenHash, token)) || null
}

async function revokeRefreshToken(tokenId, replacedBy = null) {
  try {
    const data = await readData(REFRESH_TOKENS_PATH)
    const refreshToken = data.findIndex(item => item.id === tokenId)

    if(refreshToken === -1) throw new Error('Token does not exists')
    
    const newData = {...data[refreshToken], revoked: true, replacedBy}
    data[refreshToken] = newData

    await writeData(REFRESH_TOKENS_PATH, data)
  } catch (err) {
    throw new Error(err.message)
  }
}

async function revokeAllUserTokens(userId) {
  const data = await readData(REFRESH_TOKENS_PATH)

  data.forEach(token => {
    if (token.userId === userId) {
      token.revoked = true
    }
  })

  await writeData(REFRESH_TOKENS_PATH, data)
}

async function deleteExpiredTokens() {
  const data = await readData(REFRESH_TOKENS_PATH)
  const now = Math.floor(Date.now() / 1000)
  const newData = data.filter(token => token.expiresAt > now)

  await writeData(REFRESH_TOKENS_PATH, newData)
}

module.exports = {
  saveRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
  revokeAllUserTokens,
  deleteExpiredTokens,
  findRefreshTokenForLogout
}