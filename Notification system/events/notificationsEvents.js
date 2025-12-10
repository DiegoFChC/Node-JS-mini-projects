const myEmitter = require('./index')

myEmitter.on('subscribe', (type) => {
  console.log(`🔔 You are now subscribed to ${type.toUpperCase()} notifications.`)
})

myEmitter.on('unsubscribe', (type) => {
  console.log('🟡 You are not longer suscribed to', type.toUpperCase())
})

myEmitter.on('message', (type, message) => {
  console.log(`📢 [${type.toUpperCase()}] ${message}`)
})