const { unauthorized } = require('../utils/sendResponse')

function cookieParser (req, res, next) {
  const { cookie } = req.headers

  if(!cookie) {
    return unauthorized(res)
  }

  const headerCookies = cookie.split(';').map(item => item.trim())
  const cookies = {}

  for (const headerCookie of headerCookies) {
    const [name, content] = headerCookie.split('=')
    cookies[name] = content
  }

  if (!cookies.refreshToken || cookies.refreshToken === '') {
    return unauthorized(res)
  }
  req.cookies = cookies
  next()
}

module.exports = { cookieParser }