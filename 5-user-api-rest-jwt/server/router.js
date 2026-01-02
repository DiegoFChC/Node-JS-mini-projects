const { bodyParser } = require('../middlewares/bodyParser')
const { urlParser } = require('../middlewares/urlParser')
const { validUUIDMiddleware } = require('../middlewares/validUUID')
const {
  getUser,
  getUsers,
  putUser,
  patchUser,
  deleteUser,
} = require('../routes/users.routes')
const { postUser, login } = require('../routes/auth.routes')
const { ok, notFound } = require('../utils/sendResponse')

async function router(req, res) {
  urlParser(req, res, () => {
    const { url, method, urlParts, searchParams } = req
    const [base, slug] = urlParts

    if (method === 'GET' && url === '/') {
      return ok(res, { message: 'Welcome to my server' })
    }

    if (base === 'users') {
      if (method === 'GET' && slug) {
        return validUUIDMiddleware(req, res, () => getUser(req, res, slug))
      }
      if (method === 'GET') {
        return getUsers(req, res, searchParams)
      }
      if (method === 'PUT' && slug) {
        return validUUIDMiddleware(req, res, () =>
          bodyParser(req, res, () => putUser(req, res, slug))
        )
      }
      if (method === 'PATCH' && slug) {
        return validUUIDMiddleware(req, res, () =>
          bodyParser(req, res, () => patchUser(req, res, slug))
        )
      }
      if (method === 'DELETE' && slug) {
        return validUUIDMiddleware(req, res, () => deleteUser(req, res, slug))
      }
    }

    if (base === 'auth') {
      if (method === 'POST' && slug === 'register') {
        return bodyParser(req, res, () => postUser(req, res))
      }
      if (method === 'POST' && slug === 'login') {
        return bodyParser(req, res, () => login(req, res))
      }
    }
    notFound(res)
  })
}

module.exports = { router }
