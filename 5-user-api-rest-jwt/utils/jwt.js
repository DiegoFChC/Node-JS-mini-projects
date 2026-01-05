const crypto = require('node:crypto')

const JWT_SECRET = process.env.JWT_SECRET

function base64url(input) {
  return Buffer.from(JSON.stringify(input)) // -> Pasa a stirng
    .toString('base64') // -> Convierte a base 64
    .replace(/=/g, '') // -> Quita los =
    .replace(/\+/g, '-') // -> Cambia + por -
    .replace(/\//g, '_') // -> Cambia / por _
}

function base64urlDecode(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(Buffer.from(input, 'base64').toString('utf8'))
}

function sign(data, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function createJWT(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const encodedHeader = base64url(header)
  const encodedPayload = base64url(payload)

  const signature = sign(
    `${encodedHeader}.${encodedPayload}`,
    JWT_SECRET
  )

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifyJWT(token) {
  if (!token) {
    throw new Error('Token missing')
  }

  const parts = token.split('.')
  const [header, payload, signatue] = parts

  // Verificación de firma
  const expectedSignature = sign(`${header}.${payload}`, JWT_SECRET)

  if (signatue !== expectedSignature) {
    throw new Error('Invalid token signature')
  }

  const decodedPayload = base64urlDecode(payload)

  // Expiración
  const now = Math.floor(Date.now() / 1000)
  if (decodedPayload.exp && decodedPayload.exp < now) {
    throw new Error('Token expired')
  }

  return decodedPayload
}

module.exports = { createJWT, verifyJWT }
