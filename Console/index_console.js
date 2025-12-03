const readline = require('node:readline')
const pc = require('picocolors')
const parse = require('./core/parser') // Define comando y agumentos
const route = require('./core/commandRouter') // Llama a la función correspondiente

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `\n${pc.green(pc.bold(__dirname))} ${pc.bold(pc.blue('> '))}`
})

rl.prompt()

rl.on('line', async (input) => {
  const parsed = parse(input)
  await route(parsed)
  rl.prompt()
})
