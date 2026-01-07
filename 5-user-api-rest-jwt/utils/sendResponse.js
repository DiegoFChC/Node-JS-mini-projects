function send(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const ok = (res, data) => send(res, 200, data)
const okNoContent = (res) => 
  send(res, 204, {})
const created = (res, data) =>
  send(res, 201, { message: 'Created successfully', result: data })
const badRequest = (res, message = 'Bad request') =>
  send(res, 400, { message })
const notFound = (res, message = 'Not found') =>
  send(res, 404, { message })
const unsupportedMedia = (res) =>
  send(res, 415, { message: 'Unsupported Media Type' })
const internalServerError = (res) =>
  send(res, 500, { message: 'Internal Server Error' })
const unauthorized = (res, message = 'Unauthorized') => 
  send(res, 401, { message })
const forbidden = (res, message = 'Forbidden') => {
  send(res, 403, { message })
}

module.exports = {
  ok,
  created,
  badRequest,
  notFound,
  unsupportedMedia,
  okNoContent,
  internalServerError,
  unauthorized,
  forbidden
}
