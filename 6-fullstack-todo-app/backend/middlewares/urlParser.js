const { URL } = require('node:url')

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

function urlParser(req, res, next) {
  const { url, headers: { host }, method } = req

  const { pathname, searchParams } = new URL(`http://${host}${url}`)
  let searchParamsList = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsList[key] = value
  }

  req.searchParams = searchParamsList
  req.url = pathname

  const id = url.split('/').filter(Boolean).slice(-1)[0]

  if (UUID_REGEX.test(id)) {
    req.id = id
    req.url = '/' + url.split('/').filter(Boolean).slice(0, -1).join('/')
  }
  console.log(method, url)

  next()
}

module.exports = { urlParser }
