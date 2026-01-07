const { URL } = require('node:url')

function urlParser(req, res, next) {
  const {
    url,
    headers: { host },
  } = req

  const contentType = req.headers['content-type']

  const { pathname, searchParams } = new URL(`http://${host}${url}`)
  const [base, slug, optional] = pathname.split('/').filter(Boolean)

  let searchParamsList = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsList[key] = value
  }

  req.pathname = pathname
  req.base = base
  req.slug = slug
  req.optional = optional
  req.searchParams = searchParamsList
  req.contentType = contentType

  next()
}

module.exports = { urlParser }
