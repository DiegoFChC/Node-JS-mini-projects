const { createInterface } = require('node:readline/promises')
const parser = require('./core/parser')
const router = require('./core/commandRouter')

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