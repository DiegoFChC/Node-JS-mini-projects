const { getAllUsers, getUserById, createUser } = require('../core/userStorage')
const { validUUID } = require('../utils/utils')
const { bodyParser } = require('../utils/bodyParser')
const {
  badRequest,
  created,
  notFound,
  ok,
  unsupportedMedia,
} = require('../utils/sendResponse')

async function getUsers(req, res, searchParams) {
  const page = searchParams.page ?? null
  const limit = searchParams.limit ?? null

  const hasPagination = page !== null || limit !== null
  let pageFilter = null
  let limitFilter = null

  if (hasPagination) {
    pageFilter = 1
    limitFilter = 10

    if (page !== null) {
      const pageNumber = Number(page)
      if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        return badRequest(res)
      }
      pageFilter = pageNumber
    }

    if (limit !== null) {
      const limitNumber = Number(limit)
      if (!Number.isInteger(limitNumber) || limitNumber < 1) {
        return badRequest(res)
      }
      limitFilter = limitNumber
    }
  }

  const data = await getAllUsers(pageFilter, limitFilter)
  ok(res, data)
}

async function getUser(req, res, id) {
  if (!validUUID(id)) {
    return badRequest(res, 'Invalid user id')
  }

  const user = await getUserById(id)
  if (!user) {
    return notFound(res, 'User id not found')
  }

  ok(res, user)
}

async function postUser(req, res, contentType) {
  if (!contentType?.includes('application/json')) {
    return unsupportedMedia(res)
  }

  await bodyParser(req, res)
  const { name, lastname, email } = req.body

  if (!name || !lastname || !email) {
    return badRequest(res, 'name, lastname and email are necesary')
  }

  const newUser = await createUser({ name, lastname, email })
  created(res, newUser)
}

module.exports = {
  getUsers,
  getUser,
  postUser
}