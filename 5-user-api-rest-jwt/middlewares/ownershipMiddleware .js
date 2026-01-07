const { forbidden } = require('../utils/sendResponse')

function ownershipMiddleware (req, res, next) {
  const { sub, role } = req.user
  
  if (role === 'admin') return next()

  if (sub !== req.slug) {
    return forbidden(res, 'Access Denied')
  }

  next()
}

module.exports = { ownershipMiddleware }