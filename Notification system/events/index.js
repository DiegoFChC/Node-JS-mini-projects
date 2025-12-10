const events = require('node:events')

class Emitter extends events.EventEmitter {}

const myEmitter = new Emitter()

module.exports = myEmitter