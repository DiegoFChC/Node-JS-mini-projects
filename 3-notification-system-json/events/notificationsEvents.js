const myEmitter = require('./index')
const { getSubByName } = require('../core/storage')

myEmitter.on('message', (name, message) => {
  const sub = getSubByName(name)
  if (!sub) {
    console.log('❌ You are not subscribed to', name.toUpperCase())
    return
  }
  console.log(`📢 [${name.toUpperCase()}] ${message}`)
})