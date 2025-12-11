const commands = {
  SUBSCRIBE: {
    name: 'subscribe',
    description: 'subscribe <type>'
  },
  UNSUBSCRIBE: {
    name: 'unsubscribe',
    description: 'unsubscribe <type>'
  },
  SEND: {
    name: 'send',
    description: 'send <type> <message>'
  },
  LIST: {
    name: 'list',
    description: 'Active subscriptions'
  },
  HELP: {
    name: 'help',
    description: 'Commands list'
  },
  CLEAR: {
    name: 'clear',
    description: 'Clear console'
  },
  EXIT: {
    name: 'exit',
    description: 'End Node JS process'
  }
}

module.exports = commands