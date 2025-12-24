const { bodyParser } = require('../middlewares/bodyParser')
const { urlParser } = require('../middlewares/urlParser')
const { validUUIDMiddleware } = require('../middlewares/validUUID')
const {
  getUser,
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require('../routes/users.routes')
const { ok, notFound } = require('../utils/sendResponse')

async function router(req, res) {
  urlParser(req, res, () => {
    const { url, method, urlParts, searchParams } = req
    const [base, userId] = urlParts

    if (method === 'GET' && url === '/') {
      return ok(res, { message: 'Welcome to my server' })
    }

    if (base === 'users') {
      if (method === 'GET' && userId) {
        return validUUIDMiddleware(req, res, () => getUser(req, res, userId))
      }
      if (method === 'GET') {
        return getUsers(req, res, searchParams)
      }
      if (method === 'POST' && !userId) {
        return bodyParser(req, res, () => postUser(req, res))
      }
      if (method === 'PUT' && userId) {
        return validUUIDMiddleware(req, res, () =>
          bodyParser(req, res, () => putUser(req, res, userId))
        )
      }
      if (method === 'PATCH' && userId) {
        return validUUIDMiddleware(req, res, () =>
          bodyParser(req, res, () => patchUser(req, res, userId))
        )
      }
      if (method === 'DELETE' && userId) {
        return validUUIDMiddleware(req, res, () => deleteUser(req, res, userId))
      }
    }
    notFound(res)
  })
}

module.exports = { router }
