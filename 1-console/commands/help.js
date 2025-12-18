const pc = require('picocolors')
const commands = require('../constants/commands')

module.exports = function help() {
  const commandsList = Object.values(commands)
  commandsList.forEach((item) => {
    const { command, description } = item
    console.log(
      `${pc.bold(pc.white(command.padEnd(25)))} > ${pc.blue(description)}`
    )
  })
}
