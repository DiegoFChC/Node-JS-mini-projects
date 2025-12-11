const commandList = require('../constants/commands')

module.exports = function parse(raw) {
  const input = raw.trim().toLowerCase()
  const parts = input.split(' ')

  const commands = Object.values(commandList)

  for (const command of commands) {
    const short = command.command
    const commandLength = short.split(' ').length
    const posibleCommand = parts.slice(0, commandLength).join(' ')

    if (posibleCommand === short) {
      return {
        base: short,
        args: raw.substring(short.length).trim()
      }
    }
  }

  return {
    base: null,
    args: raw
  }
}