const { unauthorized } = require('../utils/sendResponse')
const { verifyJWT } = require('../utils/jwt')

async function authMiddleware (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return unauthorized(res)
  }

  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer' || !token) {
    return unauthorized(res, 'Invalid auth format')
  }

  try {
    const payload = await verifyJWT(token)
    req.user = payload
    next()
  } catch (err) {
    return unauthorized(res, err.message)
  }
}

module.exports = { authMiddleware }