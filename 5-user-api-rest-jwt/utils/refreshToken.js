const crypto = require('node:crypto')

const EXPIRES_DAYS = 1

function hashToken(token) {
  const salt = crypto.randomBytes(16).toString('hex')

  const hash = crypto
    .pbkdf2Sync(token, salt, 100000, 64, 'sha512')
    .toString('hex')

  return `${salt}:${hash}`
}

function compareHash(storedHash, token) {
  const [salt, originalHash] = storedHash.split(':')

  const hash = crypto
    .pbkdf2Sync(token, salt, 100000, 64, 'sha512')
    .toString('hex')

  return hash === originalHash
}

function createRefreshToken(userId) {
  const randomRefreshToken = crypto.randomBytes(16).toString('hex')
  const refreshTokenHash = hashToken(randomRefreshToken)

  const newRefreshToken = {
    id: crypto.randomUUID(),
    userId,
    tokenHash: refreshTokenHash,
    expiresAt: Math.floor(Date.now() / 1000) + EXPIRES_DAYS * 24 * 60 * 60,
    createdAt: Math.floor(Date.now() / 1000),
    revoked: false,
    replacedBy: null,
  }

  return { newRefreshToken, token: randomRefreshToken }
}

module.exports = { createRefreshToken, hashToken, compareHash }
