const { join } = require('node:path')
const { readFile, writeFile } = require('node:fs/promises')
const crypto = require('node:crypto')

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
    console.log(err)
    throw new Error('An error has ocurred while writing data')
  }
}

async function getAllUsers(page, limit) {
  const users = await readData()
  const result = {
    page: page ?? '',
    limit: limit ?? '',
    total: users.length,
    results: users,
  }
  if (page !== null && limit !== null) {
    const startIndex = (page - 1) * limit // offset
    const endIndex = startIndex + limit
    result.results = users.slice(startIndex, endIndex)
  }
  return result
}

async function getUserById(id) {
  const data = await readData()
  if (data) {
    const user = data.find((user) => user.id === id)
    if (!user) throw new Error('User id not found')
    return user
  }
}

async function createUser(data) {
  const users = await readData()
  const newUser = {
    id: crypto.randomUUID(),
    ...data,
  }
  users.push(newUser)
  await writeData(users)
  return newUser
}

async function updateUserById(id, data) {
  await getUserById(id)

  const newData = { id, ...data }
  const users = await readData()
  const userIndex = users.findIndex((item) => item.id === id)

  if (userIndex === -1) throw new Error('User index not found')

  users[userIndex] = newData
  await writeData(users)
  return newData
}

async function patchUserById(id, data) {
  const user = await getUserById(id)

  const newData = { ...user, ...data }
  const users = await readData()
  const userIndex = users.findIndex((item) => item.id === id)

  if (userIndex === -1) throw new Error('User index not found')

  users[userIndex] = newData
  await writeData(users)
  return newData
}

async function deleteUserById(id) {
  await getUserById(id)

  const users = await readData()
  const newUsers = users.filter((item) => item.id !== id)

  await writeData(newUsers)
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  patchUserById,
  deleteUserById
}
