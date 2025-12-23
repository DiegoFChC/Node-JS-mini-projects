const { urlParser } = require('../utils/urlParser')
const { getUser, getUsers, postUser, putUser, patchUser } = require('../routes/users.routes')
const { ok, notFound, badRequest } = require('../utils/sendResponse')

async function router(req, res) {
  const { url, method, contentType, urlParts, searchParams } = urlParser(req, res)

  try {
    if (method === 'GET' && url === '/')   {
      return ok(res, { message: 'Welcome to my server' })
    }

    if (urlParts[0] === 'users') {
      if (method === 'GET' && urlParts[1]) {
        return getUser(req, res, urlParts[1])
      }
      if (method === 'GET') {
        return getUsers(req, res, searchParams)
      }
      if (method === 'POST' && !urlParts[1]) {
        return postUser(req, res, contentType)
      }
      if (method === 'PUT' && urlParts[1]) {
        return putUser(req, res, urlParts[1], contentType)
      }
      if (method === 'PATCH' && urlParts[1]) {
        return patchUser(req, res, urlParts[1], contentType)
      }
    }
    notFound(res)
  } catch (err) {
    badRequest(res, err.message)
  }
}

module.exports = { router }
