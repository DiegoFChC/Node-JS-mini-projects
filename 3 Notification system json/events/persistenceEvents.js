const { loadData, addSub, deleteSub } = require('../core/storage')
const myEmitter = require('./index')

myEmitter.on('subscribe:add', async (sub) => {
  await addSub(sub)
})

myEmitter.on('subscribe:remove', async (sub) => {
  await deleteSub(sub)
})

myEmitter.on('subscribe:load', async () => {
  const data = await loadData()

  if (!data) {
    setTimeout(() => {
      process.exit(1)
    }, 1000)
  }
})