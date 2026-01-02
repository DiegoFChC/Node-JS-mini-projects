const { createUser, loginUser } = require('../core/auth.service')
const {
  badRequest,
  created,
  ok
} = require('../utils/sendResponse')

async function postUser(req, res) {
  try {
    const { name, lastname, email, password, isAdmin } = req.body
    let admin = false

    if (isAdmin) admin = true
    if (!name || !lastname || !email || !password) {
      return badRequest(res, 'name, lastname, email, password are necesary')
    }

    const newUser = await createUser({ name, lastname, email, password, admin })
    created(res, newUser)
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
    ok(res, result)
  } catch (err) {
    badRequest(res, err.message)
  }
}

module.exports = { postUser, login }