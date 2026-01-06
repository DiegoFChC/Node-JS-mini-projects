const { bodyParser } = require('../middlewares/bodyParser')
const { urlParser } = require('../middlewares/urlParser')
const { validUUIDMiddleware } = require('../middlewares/validUUID')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { roleMiddleware } = require('../middlewares/roleMiddleware')
const { ownershipMiddleware } = require('../middlewares/ownershipMiddleware ')
const {
  getUser,
  getUsers,
  putUser,
  patchUser,
  deleteUser,
} = require('../routes/users.routes')
const { postUser, login, refresh } = require('../routes/auth.routes')
const { ok, notFound } = require('../utils/sendResponse')

async function router(req, res) {
  urlParser(req, res, () => {
    const { url, method, searchParams, base, slug } = req

    if (method === 'GET' && url === '/') {
      return ok(res, { message: 'Welcome to my server' })
    }

    if (base === 'users') {
      if (method === 'GET' && slug) {
        return authMiddleware(req, res, () =>
          validUUIDMiddleware(req, res, () =>
            ownershipMiddleware(req, res, () => getUser(req, res, slug))
          )
        )
      }
      if (method === 'GET') {
        return authMiddleware(req, res, () =>
          roleMiddleware('admin')(req, res, () =>
            getUsers(req, res, searchParams)
          )
        )
      }
      if (method === 'PUT' && slug) {
        return authMiddleware(req, res, () =>
          validUUIDMiddleware(req, res, () =>
            ownershipMiddleware(req, res, () =>
              bodyParser(req, res, () => putUser(req, res, slug))
            )
          )
        )
      }
      if (method === 'PATCH' && slug) {
        return authMiddleware(req, res, () =>
          validUUIDMiddleware(req, res, () =>
            ownershipMiddleware(req, res, () =>
              bodyParser(req, res, () => patchUser(req, res, slug))
            )
          )
        )
      }
      if (method === 'DELETE' && slug) {
        return authMiddleware(req, res, () =>
          validUUIDMiddleware(req, res, () =>
            ownershipMiddleware(req, res, () => deleteUser(req, res, slug))
          )
        )
      }
    }

    if (base === 'auth') {
      if (method === 'POST' && slug === 'register') {
        return bodyParser(req, res, () => postUser(req, res))
      }
      if (method === 'POST' && slug === 'login') {
        return bodyParser(req, res, () => login(req, res))
      }
      if (method === 'POST' && slug === 'refresh') {
        return bodyParser(req, res, () => refresh(req, res))
      }
    }
    notFound(res)
  })
}

module.exports = { router }
