const commandsList = require('./commandsList')
const commands = require('./commands')
require('../events/notificationsEvents')

module.exports = {
  [commandsList.SUBSCRIBE.name]: commands.subscribe,
  [commandsList.UNSUBSCRIBE.name]: commands.unsubscribe,
  [commandsList.SEND.name]: commands.send,
  [commandsList.LIST.name]: commands.list,
  [commandsList.HELP.name]: commands.help,
  [commandsList.CLEAR.name]: commands.clear,
  [commandsList.EXIT.name]: commands.exit,
}