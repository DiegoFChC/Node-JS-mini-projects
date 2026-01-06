const { createUser, loginUser } = require('../core/auth.service')
const {
  deleteExpiredTokens,
  findRefreshTokenByHash,
  revokeAllUserTokens,
  revokeRefreshToken,
  saveRefreshToken,
} = require('../core/refreshTokens.service')
const { getUserById } = require('../core/user.service')
const { createJWT } = require('../utils/jwt')
const { hashToken, createRefreshToken } = require('../utils/refreshToken')
const { badRequest, created, ok } = require('../utils/sendResponse')

async function postUser(req, res) {
  try {
    const { name, lastname, email, password, isAdmin } = req.body
    let admin = false

    if (isAdmin) admin = true
    if (!name || !lastname || !email || !password) {
      return badRequest(res, 'name, lastname, email, password are necesary')
    }

    const newUser = await createUser({ name, lastname, email, password, admin })
    return created(res, newUser)
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return badRequest(res, 'email and password are required')
    }

    const result = await loginUser({ email, password })
    return ok(res, result)
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function refresh(req, res) {
  try {
    const { token: tokenReceived } = req.body

    if (!tokenReceived) {
      return badRequest(res, 'token is required')
    }

    const currentRefreshToken = await findRefreshTokenByHash(tokenReceived)
    const { userId } = currentRefreshToken

    const currentUser = await getUserById(userId)

    const newAccessToken = createJWT({
      sub: currentUser.id,
      role: currentUser.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    })

    const { newRefreshToken, token } = createRefreshToken(currentUser.id)

    await saveRefreshToken(newRefreshToken)
    await revokeRefreshToken(currentRefreshToken.id, newRefreshToken.id)

    return ok(res, {
      accessToken: newAccessToken,
      refreshToken: token,
    })
  } catch (err) {
    return badRequest(res, err.message)
  }
}

module.exports = { postUser, login, refresh }
