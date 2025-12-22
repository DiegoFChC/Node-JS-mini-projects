const { getAllUsers, getUserById, createUser } = require('../core/userStorage')
const { validUUID } = require('../utils/utils')
const { bodyParser } = require('../utils/bodyParser')
const { urlParser } = require('../utils/urlParser')

async function router(req, res) {
  const { url, method, contentType, urlParts, searchParams } = urlParser(
    req,
    res
  )

  if (method === 'GET') {
    if (url === '/') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(
        JSON.stringify({
          message: 'Welcome to my server',
        })
      )
      res.end()
    } else if (urlParts[0] === 'users' && urlParts[1]) {
      const possibleId = urlParts[1]
      if (!validUUID(possibleId)) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ message: 'Invalid user id' }))
        res.end()
        return
      }
      try {
        const user = await getUserById(possibleId)
        if (user) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.write(JSON.stringify(user))
          res.end()
        } else {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.write(JSON.stringify({ message: 'User id not found' }))
          res.end()
        }
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(
          JSON.stringify({
            message: 'An error has ocurred',
          })
        )
        res.end()
      }
    } else if (urlParts[0] === 'users' && !urlParts[1]) {
      const page = searchParams.page
      const limit = searchParams.limit
      const hasPagination = page !== null || limit !== null
      let pageFilter = null
      let limitFilter = null
      if (hasPagination) {
        pageFilter = 1
        limitFilter = 10
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        if (page !== null) {
          if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(
              JSON.stringify({
                message: 'Bad request',
              })
            )
            res.end()
            return
          }
          pageFilter = pageNumber
        }

        if (limit !== null) {
          if (!Number.isInteger(limitNumber) || limitNumber < 1) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(
              JSON.stringify({
                message: 'Bad request',
              })
            )
            res.end()
            return
          }
          limitFilter = limitNumber
        }
      }
      try {
        const data = await getAllUsers(pageFilter, limitFilter)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
        res.end()
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(
          JSON.stringify({
            message: 'An error has ocurred while loading data',
          })
        )
        res.end()
      }
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.write(
        JSON.stringify({
          message: 'Not found',
        })
      )
      res.end()
    }
  } else if (method == 'POST') {
    if (urlParts[0] === 'users' && !urlParts[1]) {
      if (contentType && contentType.includes('application/json')) {
        try {
          await bodyParser(req, res)
          const { name, lastname, email } = req.body
          if (name && lastname && email) {
            try {
              const newUser = await createUser({ name, lastname, email })
              res.statusCode = 201
              res.setHeader('Content-Type', 'application/json')
              res.write(
                JSON.stringify({
                  message: 'User created successfully',
                  result: newUser,
                })
              )
              res.end()
            } catch {
              res.statusCode = 500
              res.setHeader('Content-Type', 'text/json')
              res.write(
                JSON.stringify({
                  message: 'An error has ocurred while writing data',
                })
              )
              res.end()
            }
          } else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/json')
            res.write(
              JSON.stringify({
                message: 'name, lastname and email are necesary',
              })
            )
            res.end()
          }
        } catch (err) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.write(
            JSON.stringify({
              mesage: 'An error has ocurred while receiving data',
              error: err.message,
            })
          )
          res.end()
        }
      } else {
        res.statusCode = 415
        res.setHeader('Content-Type', 'application/json')
        res.write(
          JSON.stringify({
            mesage: 'Unsupported Media Type',
          })
        )
        res.end()
      }
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.write(
        JSON.stringify({
          message: 'Not found',
        })
      )
      res.end()
    }
  } else {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(
      JSON.stringify({
        message: 'Method not allowed',
      })
    )
    res.end()
  }
}

module.exports = { router }
