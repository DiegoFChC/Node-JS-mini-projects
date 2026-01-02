const { join } = require('node:path')
const { readFile, writeFile } = require('node:fs/promises')

const { validateEmail } = require('../utils/validateEmail')

const PATH_DATA = join(process.cwd(), 'data', 'users.json')

async function readData() {
  try {
    const data = await readFile(PATH_DATA, 'utf8')
    return data !== '' ? JSON.parse(data) : []
  } catch {
    throw new Error('An error has ocurred while loading data')
  }
}

async function writeData(data) {
  try {
    await writeFile(PATH_DATA, JSON.stringify(data))
  } catch (err) {
    throw new Error('An error has ocurred while writing data')
  }
}

async function validateEmailExists(email) {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format')
  }

  const users = await readData()
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
