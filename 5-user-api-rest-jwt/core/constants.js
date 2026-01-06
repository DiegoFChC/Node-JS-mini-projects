const { join } = require('node:path')

const USERS_DATA_PATH = join(process.cwd(), 'data', 'users.json')
const REFRESH_TOKENS_PATH = join(process.cwd(), 'data', 'refreshTokens.json')

module.exports = {
  USERS_DATA_PATH,
  REFRESH_TOKENS_PATH
}