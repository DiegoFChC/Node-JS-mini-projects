const { readData, writeData } = require('./storage.service')
const { USERS_DATA_PATH } = require('./constants')

async function getAllUsers(page, limit) {
  const users = await readData(USERS_DATA_PATH)
  const usersClear = users.map((user) => {
    const { id, name, lastname, email, role } = user
    return { id, name, lastname, email, role }
  })
  const result = {
    page: page ?? '',
    limit: limit ?? '',
    total: usersClear.length,
    results: usersClear,
  }
  if (page !== null && limit !== null) {
    const startIndex = (page - 1) * limit // offset
    const endIndex = startIndex + limit
    result.results = usersClear.slice(startIndex, endIndex)
  }
  return result
}

async function getUserById(id) {
  const data = await readData(USERS_DATA_PATH)
  if (data) {
    const user = data.find((user) => user.id === id)
    if (!user) throw new Error('User id not found')
    return user
  }
}

async function updateUserById(id, data) {
  await getUserById(id)

  const newData = { id, ...data }
  const users = await readData(USERS_DATA_PATH)
  const userIndex = users.findIndex((item) => item.id === id)

  if (userIndex === -1) throw new Error('User index not found')

  users[userIndex] = newData
  await writeData(USERS_DATA_PATH, users)
  return newData
}

async function patchUserById(id, data) {
  const user = await getUserById(id)

  const newData = { ...user, ...data }
  const users = await readData(USERS_DATA_PATH)
  const userIndex = users.findIndex((item) => item.id === id)

  if (userIndex === -1) throw new Error('User index not found')

  users[userIndex] = newData
  await writeData(USERS_DATA_PATH, users)
  return newData
}

async function deleteUserById(id) {
  await getUserById(id)

  const users = await readData(USERS_DATA_PATH)
  const newUsers = users.filter((item) => item.id !== id)

  await writeData(USERS_DATA_PATH, newUsers)
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  patchUserById,
  deleteUserById
}
