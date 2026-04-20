const { loadData, saveData } = require('../services/tasks.services')
const crypto = require('node:crypto')

async function getTasks(req, res) {
  const page = req.searchParams.page ?? null
  const limit = req.searchParams.limit ?? null

  const hasPagination = page !== null || limit !== null
  let pageFilter = null
  let limitFilter = null

  if (hasPagination) {
    pageFilter = 1
    limitFilter = 10

    if (page !== null && Number(page) > 0) {
      const pageNumber = Number(page)
      pageFilter = pageNumber
    }
    if (limit !== null && Number(limit) > 0) {
      const limitNumber = Number(limit)
      limitFilter = limitNumber
    }
  }

  try {
    const tasks = await loadData(pageFilter, limitFilter)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(tasks))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: err.message }))
  }
}

async function getTask(req, res, id) {
  try {
    const { data } = await loadData()
    const task = data.find(t => t.id === id)

    if (!task) {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      })
      return res.end(JSON.stringify({ message: 'Task not found' }))
    }

    res.writeHead(200, {
      'Content-Type': "application/json"
    })
    res.end(JSON.stringify(task))
  } catch (err) {

  }
}

async function createTask(req, res) {
  const { title, description } = req.body

  if (!title || !description) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Title and description are required' }))
  }

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description,
    isActive: true
  }

  try {
    const { data } = await loadData()
    data.unshift(newTask)

    await saveData(data)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Task created successfully', data: newTask }))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: err.message }))
  }
}

async function updateTask(req, res, id) {
  const { title, description } = req.body

  try {
    const { data } = await loadData()
    const task = data.findIndex(t => t.id === id)

    if (task === -1) {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      })
      return res.end(JSON.stringify({ message: 'Task not found' }))
    }

    if (title) data[task].title = title
    if (description) data[task].description = description

    await saveData(data)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Task updated successfully' }))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: err.message }))
  }
}

async function deleteTask(req, res, id) {
  try {
    const { data } = await loadData()
    const task = data.findIndex(t => t.id === id)

    if (task === -1) {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      })
      return res.end(JSON.stringify({ message: 'Task not found' }))
    }

    const newData = data.filter(task => task.id !== id)

    await saveData(newData)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Task removed successfully' }))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: err.message }))
  }
}

async function toggleTaskState(req, res, id) {
  try {
    const { data } = await loadData()
    const task = data.findIndex(t => t.id === id)

    if (task === -1) {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      })
      return res.end(JSON.stringify({ message: 'Task not found' }))
    }

    data[task].isActive = !data[task].isActive

    await saveData(data)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Task updated successfully' }))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: err.message }))
  }
}

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask, toggleTaskState }
