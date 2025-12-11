const pc = require('picocolors')

module.exports = function printPrompt () {
  console.log(pc.bold(pc.blue('\n>')), pc.green(pc.bold(__dirname)))
}