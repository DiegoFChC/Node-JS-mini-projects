const { createUser, loginUser } = require('../core/auth.service')
const { addToBlacklist } = require('../core/blackList.service')
const {
  deleteExpiredTokens,
  findRefreshTokenByHash,
  revokeAllUserTokens,
  revokeRefreshToken,
  saveRefreshToken,
  findRefreshTokenForLogout
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

    const { accessToken, refreshToken, expiresInSeconds } = await loginUser({
      email,
      password,
    })

    const cookieOptions = [
      `refreshToken=${refreshToken}`,
      'HttpOnly',
      'Path=/auth',
      `Max-Age=${expiresInSeconds}`,
      'SameSite=Lax',
    ]

    res.setHeader('Set-Cookie', cookieOptions.join('; '))

    return ok(res, { accessToken })
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.cookies

    const currentRefreshToken = await findRefreshTokenByHash(refreshToken)
    const { id, userId } = currentRefreshToken

    const currentUser = await getUserById(userId)

    const newAccessToken = createJWT({
      sub: currentUser.id,
      role: currentUser.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    })

    const { newRefreshToken, token, expiresInSeconds } = createRefreshToken(
      currentUser.id
    )

    await saveRefreshToken(newRefreshToken)
    await revokeRefreshToken(id, newRefreshToken.id)

    const cookieOptions = [
      `refreshToken=${token}`,
      'HttpOnly',
      'Path=/auth',
      `Max-Age=${expiresInSeconds}`,
      'SameSite=Lax',
    ]

    res.setHeader('Set-Cookie', cookieOptions.join('; '))

    return ok(res, {
      accessToken: newAccessToken,
    })
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function logout(req, res) {
  try {
    const { jti, exp } = req.user
    const { refreshToken } = req.cookies

    if (refreshToken) {
      const storedToken = await findRefreshTokenForLogout(refreshToken)
      if (storedToken && !storedToken.revoked) {
        await revokeRefreshToken(storedToken.id)
      }
    }

    await addToBlacklist(jti, exp)

    const cookieOptions = [
      `refreshToken=`,
      'HttpOnly',
      'Path=/auth',
      `Max-Age=0`,
      'SameSite=Lax',
    ]

    res.setHeader('Set-Cookie', cookieOptions.join('; '))

    return ok(res)
  } catch (err) {
    return ok(res)
  }
}

async function logoutAll(req, res) {
  try {
    const { jti, exp } = req.user
    const { refreshToken } = req.cookies
    
    if (refreshToken) {
      const storedToken = await findRefreshTokenForLogout(refreshToken)

      if (storedToken && !storedToken.revoked) {
        await revokeAllUserTokens(storedToken.userId)
      }
    }

    await addToBlacklist(jti, exp)

    const cookieOptions = [
      `refreshToken=`,
      'HttpOnly',
      'Path=/auth',
      `Max-Age=0`,
      'SameSite=Lax',
    ]

    res.setHeader('Set-Cookie', cookieOptions.join('; '))

    return ok(res)
  } catch (err) {
    return ok(res)
  }
}

module.exports = { postUser, login, refresh, logout, logoutAll }
