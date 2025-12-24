const { urlParser } = require('../utils/urlParser')
const { getUser, getUsers, postUser, putUser, patchUser, deleteUser } = require('../routes/users.routes')
const { ok, notFound, internalServerError } = require('../utils/sendResponse')

async function router(req, res) {
  const { url, method, contentType, urlParts, searchParams } = urlParser(req, res)
  const [urlBase, userId] = urlParts

  try {
    if (method === 'GET' && url === '/')   {
      return ok(res, { message: 'Welcome to my server' })
    }

    if (urlBase === 'users') {
      if (method === 'GET' && userId) {
        return getUser(req, res, userId)
      }
      if (method === 'GET') {
        return getUsers(req, res, searchParams)
      }
      if (method === 'POST' && !userId) {
        return postUser(req, res, contentType)
      }
      if (method === 'PUT' && userId) {
        return putUser(req, res, userId, contentType)
      }
      if (method === 'PATCH' && userId) {
        return patchUser(req, res, userId, contentType)
      }
      if (method === 'DELETE' && userId) {
        return deleteUser(req, res, userId)
      }
    }
    notFound(res)
  } catch (err) {
    internalServerError(res)
  }
}

module.exports = { router }
