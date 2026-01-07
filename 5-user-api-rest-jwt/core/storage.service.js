const { readFile, writeFile } = require('node:fs/promises')
const { validateEmail } = require('../utils/validateEmail')
const { USERS_DATA_PATH } = require('./constants')

async function readData(path) {
  try {
    const data = await readFile(path, 'utf8')
    return data !== '' ? JSON.parse(data) : []
  } catch {
    throw new Error('An error has ocurred while loading data')
  }
}

async function writeData(path, data) {
  try {
    await writeFile(path, JSON.stringify(data))
  } catch (err) {
    throw new Error('An error has ocurred while writing data')
  }
}

async function validateEmailExists(email) {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format')
  }

  const users = await readData(USERS_DATA_PATH)
  const exists = users.find((user) => user.email === email)

  if (exists !== undefined) {
    throw new Error('This email already exists.')
  }
  return
}

module.exports = {
  readData,
  writeData,
  validateEmailExists
}
