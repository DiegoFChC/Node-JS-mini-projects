const myEmitter = require('../events/index')
const commands = require('./commandsList')

const subscriptions = new Set()

function subscribe(params) {
  if (!params.length > 0) {
    return console.log('❌ Please write a subscription type')
  }

  if (subscriptions.has(params)) {
    return console.log('❌ You are already subscribed to', params.toUpperCase())
  }
  subscriptions.add(params)
  myEmitter.emit('subscribe', params)
}

function unsubscribe(params) {
  if (subscriptions.has(params)) {
    subscriptions.delete(params)
    myEmitter.emit('unsubscribe', params)
  } else {
    console.log('❌ You are not subscribed to', params.toUpperCase())
  }
}

function send(params) {
  const argsList = params.split(' ')

  if (!params || argsList.length < 1) {
    return console.log('❌ Please write de subscription name and the message')
  }

  const subscription = argsList[0]
  const message = argsList.slice(1).join(' ')

  if (!subscriptions.has(subscription)) {
    return console.log('❌ You are not subscribed to', subscription.toUpperCase())
  }
  myEmitter.emit('message', subscription, message)
}

function list() {
  if (subscriptions.size === 0) return console.log('😑 No active subscriptions')
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
