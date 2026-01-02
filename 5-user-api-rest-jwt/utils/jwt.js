const crypto = require('node:crypto')

const JWT_SECRET = process.env.JWT_SECRET

function base64url(input) {
  return Buffer.from(JSON.stringify(input)) // -> Pasa a stirng
    .toString('base64') // -> Convierte a base 64
    .replace(/=/g, '') // -> Quita los =
    .replace(/\+/g, '-') // -> Cambia + por -
    .replace(/\//g, '_') // -> Cambia / por _
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


module.exports = { createJWT }
