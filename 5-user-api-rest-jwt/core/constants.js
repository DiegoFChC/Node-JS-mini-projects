const { join } = require('node:path')

const USERS_DATA_PATH = join(process.cwd(), 'data', 'users.json')
const REFRESH_TOKENS_PATH = join(process.cwd(), 'data', 'refreshTokens.json')
const JWT_BLACK_LIST = join(process.cwd(), 'data', 'jwtBlackList.json')

module.exports = {
  USERS_DATA_PATH,
  REFRESH_TOKENS_PATH,
  JWT_BLACK_LIST
}