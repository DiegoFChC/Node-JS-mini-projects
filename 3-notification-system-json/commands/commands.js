const myEmitter = require('../events/index')
const commands = require('./commandsList')
const { getSubs } = require('../core/storage')

function subscribe(params) {
  if (!params.length > 0) {
    return console.log('❌ Please write a subscription name')
  }
  myEmitter.emit('subscribe:add', params)
}

function unsubscribe(params) {
  if (!params.length > 0) {
    return console.log('❌ Please write a subscription name')
  }
  myEmitter.emit('subscribe:remove', params)
}

function send(params) {
  const argsList = params.split(' ')

  if (!params || argsList.length < 1) {
    return console.log('❌ Please write de subscription name and the message')
  }

  const subscription = argsList[0]
  const message = argsList.slice(1).join(' ')

  myEmitter.emit('message', subscription, message)
}

function list() {
  const subscriptions = getSubs()
  if (subscriptions.length === 0) return console.log('😑 No active subscriptions')
  for (const subscription of subscriptions) {
    console.log('-', subscription)
  }
}

function help() {
  const commandsList = Object.values(commands)
  for (const command of commandsList) {
    const { name, description } = command
    console.log(`${name.padEnd(20)} ${description}`)
  }
}

function clear() {
  console.clear()
}

function exit() {
  myEmitter.emit('log:info', 'Program closed')
  console.log('👋 Bye')
  process.exit(0)
}

module.exports = {
  subscribe,
  unsubscribe,
  send,
  list,
  help,
  clear,
  exit,
}
