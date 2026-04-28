const { open } = require('node:fs/promises')
const path = require('node:path')

const DATA_PATH = path.join(process.cwd(), 'data', 'tasks.json')

async function loadData(page, limit) {
  let fileHandle
  try {
    fileHandle = await open(DATA_PATH, 'r')
    const { size } = await fileHandle.stat()

    if (size === 0) return []

    const buffer = Buffer.alloc(size)
    const offset = 0
    const length = size
    const position = 0

    await fileHandle.read(buffer, offset, length, position)
    const data = buffer.toString('utf8')

    const list = JSON.parse(data) ?? []

    if (page !== null && page !== undefined && limit !== null && limit !== undefined) {
      const start = (page - 1) * limit
      const end = start + limit
      return {
        total: list.length,
        page: page,
        totalPages: Math.ceil(list.length / limit),
        limit: limit,
        data: list.slice(start, end)
      }
    }

    return {
      total: list.length,
      page: 1,
      totalPages: Math.ceil(list.length / limit),
      limit: list.length,
      data: list
    }
  } catch (err) {
    throw new Error(`Error loading data: ${err.message}`)
  } finally {
    if (fileHandle) await fileHandle.close()
  }
}

async function saveData(data) {
  let fileHandle
  try {
    fileHandle = await open(DATA_PATH, 'w')
    fileHandle.write(JSON.stringify(data))
  } catch (err) {
    throw new Error(`Error saving data: ${err.message}`)
  } finally {
    if (fileHandle) await fileHandle.close()
  }
}

module.exports = { loadData, saveData }
