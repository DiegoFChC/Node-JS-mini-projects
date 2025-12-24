const { URL } = require('node:url')

function urlParser(req, res, next) {
  const {
    url,
    headers: { host },
  } = req

  const contentType = req.headers['content-type']

  const { pathname, searchParams } = new URL(`http://${host}${url}`)
  const urlParts = pathname.split('/').filter(Boolean)

  let searchParamsList = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsList[key] = value
  }

  req.pathname = pathname
  req.urlParts = urlParts
  req.searchParams = searchParamsList
  req.contentType = contentType

  next()
}

module.exports = { urlParser }
