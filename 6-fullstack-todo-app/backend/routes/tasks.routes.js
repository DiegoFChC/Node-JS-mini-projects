const { bodyParser } = require('../middlewares/bodyParser')
const { getTasks, createTask, getTask, updateTask, deleteTask, toggleTaskState } = require('../controllers/tasks.controller')

function tasksRoutes(req, res) {
  const { method, url, id } = req

  if (method === 'GET') {
    if (url === '/task' && !id) {
      return getTasks(req, res)
    }
    if (url === '/task' && id) {
      return getTask(req, res, id)
    }
  }
  if (method === 'POST') {
    if (url === '/task' && !id) {
      return bodyParser(req, res, () => createTask(req, res))
    }
    if (url === '/task/toggle' && id) {
      return toggleTaskState(req, res, id)
    }
  }
  if (method === 'PATCH') {
    if (url === '/task' && id) {
      return bodyParser(req, res, () => updateTask(req, res, id))
    }
  }
  if (method === 'DELETE') {
    if (url === '/task' && id) {
      return deleteTask(req, res, id)
    }
  }

  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Url not found' }))
}

module.exports = { tasksRoutes }
