// Handles system-level events (errors, warnings, logs)
const myEmitter = require('./index')
const fs = require('node:fs')
const path = require('node:path')

function saveLog(type, message) {
  const logPath = path.join(process.cwd(), 'logs', 'app.log')
  const timestamp = new Date().toLocaleString()

  const line = `[${timestamp.padEnd(10)}] ${type.toUpperCase().padEnd(7)} ${message}\n`

  fs.appendFile(logPath, line, (err) => {
    if (err) {
      myEmitter.emit('cli:error', `❌ Error saving log: ${err}`)
    }
  })
}

myEmitter.on('log:info', (message) => {
  saveLog('info', message)
})

myEmitter.on('log:error', (message) => {
  saveLog('error', message)
})

myEmitter.on('log:action', (message) => {
  saveLog('action', message)
})

myEmitter.on('cli:error', (message) => {
  console.log(message)
})

myEmitter.on('cli:message', (message) => {
  console.log(message)
})