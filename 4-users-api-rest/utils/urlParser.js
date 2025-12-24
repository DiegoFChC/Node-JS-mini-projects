const { URL } = require('node:url')

function urlParser(req, res) {
  const {
    url,
    method,
    headers: { host },
  } = req

  const contentType = req.headers['content-type']

  const { pathname, searchParams } = new URL(`http://${host}${url}`)
  const urlParts = pathname.split('/').filter(Boolean)

  let searchParamsList = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsList[key] = value
  }

  return {
    url,
    method,
    contentType,
    urlParts,
    searchParams: searchParamsList,
  }
}

module.exports = { urlParser }
