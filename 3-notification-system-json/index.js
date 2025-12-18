const myEmitter = require('./events/index')
require('./events/notificationsEvents')
require('./events/persistenceEvents')
require('./events/systemEvents')
const { createInterface } = require('node:readline/promises')
const parser = require('./core/parser')
const router = require('./core/commandRouter')

myEmitter.emit('subscribe:load')

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
})

rl.prompt()

rl.on('line', (line) => {
  const { base, args } = parser(line)
  router(base, args)
  rl.prompt()
})