const commands = require('../commands')
const pc = require('picocolors')

module.exports = async function route({ base, args }) {
  const fn = commands[base]

  if (!fn) {
    console.log(pc.blue('Unknown command'))
    return
  }

  await fn(args)
}