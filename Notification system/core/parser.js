const commandList = require('../commands/commandsList')

module.exports = function parser (line) {
  const cleanedLine = line.trim().toLowerCase()
  const lineParts = cleanedLine.split(' ').filter(part => part !== '')
  const commands = Object.values(commandList)

  for (const command of commands) {
    const shortCommand = command.name
    const commandLength = shortCommand.split(' ').length
    const posibleCommand = lineParts.slice(0, commandLength).join(' ')

    if (shortCommand === posibleCommand) {
      return {
        base: shortCommand,
        args: (line.substring(shortCommand.length).trim()).toLowerCase()
      }
    }
  }

  return {
    base: null,
    args: line.toLowerCase()
  }
}