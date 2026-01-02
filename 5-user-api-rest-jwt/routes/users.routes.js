const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  patchUserById,
  deleteUserById,
} = require('../core/userStorage')
const { validateFields } = require('../utils/validateFields')
const {
  badRequest,
  created,
  ok,
  okNoContent,
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

  try {
    const data = await getAllUsers(pageFilter, limitFilter)
    ok(res, data)
  } catch (err) {
    badRequest(res, err.message)
  }
}

async function getUser(req, res, id) {
  try {
    const user = await getUserById(id)
    ok(res, user)
  } catch (err) {
    badRequest(res, err.message)
  }
}

async function postUser(req, res) {
  try {
    const { name, lastname, email } = req.body
    if (!name || !lastname || !email) {
      return badRequest(res, 'name, lastname and email are necesary')
    }

    const newUser = await createUser({ name, lastname, email })
    created(res, newUser)
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function putUser(req, res, id) {
  try {
    const { name, lastname, email } = req.body
    if (!name || !lastname || !email) {
      return badRequest(res, 'name, lastname and email are necesary')
    }

    const updatedUser = await updateUserById(id, { name, lastname, email })

    ok(res, updatedUser)
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function patchUser(req, res, id) {
  try {
    const { name, lastname, email } = req.body
    if (!name && !lastname && !email) {
      return badRequest(res, 'At least one field is required')
    }

    const newFields = validateFields(req.body, ['name', 'lastname', 'email'])

    const updatedUser = await patchUserById(id, newFields)

    ok(res, updatedUser)
  } catch (err) {
    return badRequest(res, err.message)
  }
}

async function deleteUser(req, res, id) {
  try {
    await deleteUserById(id)
    okNoContent(res)
  } catch (err) {
    badRequest(res, err.message)
  }
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
}
