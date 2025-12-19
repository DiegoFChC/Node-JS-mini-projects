const { join } = require('node:path')
const { readFile, writeFile } = require('node:fs/promises')

const PATH_DATA = join(process.cwd(), 'data', 'users.json')

async function readData() {
  try {
    const data = await readFile(PATH_DATA, 'utf8')
    return data !== '' ? JSON.parse(data) : []
  } catch {
    throw new Error('An error has ocurred while loading data')
  }
}

function getAllUsers() {
  return readData()
}

async function getUserById(id) {
  const data = await readData()
  if (data) {
    const user = data.find(user => user.id === id)
    return user ?? null
  }
}

module.exports = { getAllUsers, getUserById }