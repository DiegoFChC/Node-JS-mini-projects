const { forbidden } = require('../utils/sendResponse')

function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    const user = req.user

    if (!user || !user.role) {
      return forbidden(res)
    }

    // Converit en array si es un solo rol
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    if (!roles.includes(user.role)) {
      return forbidden(res, 'Insufficient permissions')
    }

    next()
  }
}

module.exports = { roleMiddleware }