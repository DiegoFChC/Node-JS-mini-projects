const commands = require('../commands/index')

module.exports = function commandRouter(base, args) {
  const fn = commands[base]
  if (!fn) return console.log('Unknown command')

  fn(args)
}
