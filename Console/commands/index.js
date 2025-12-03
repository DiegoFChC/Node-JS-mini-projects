const commands = require('../constants/commands')

module.exports = {
  [commands.LS.command]: require('./ls'),
  [commands.CLEAR.command]: require('./clear'),
  [commands.CREATE_FILE.command]: require('./createFile'),
  [commands.DELETE_FILE.command]: require('./deleteFile'),
  [commands.READ_FILE.command]: require('./readFile'),
  [commands.WRITE_FILE.command]: require('./writeFile'),
  [commands.CREATE_DIRECTORY.command]: require('./createDirectory'),
  [commands.DELETE_DIRECTORY.command]: require('./deleteDirectory'),
  [commands.RENAME.command]: require('./rename'),
  [commands.HELP.command]: require('./help'),
  [commands.EXIT.command]: require('./exit')
}