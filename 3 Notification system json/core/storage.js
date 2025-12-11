const myEmitter = require('../events/index')
const fs = require('node:fs/promises')
const path = require('node:path')

let subscriptions = []

const DB_FILE = path.join(process.cwd(), 'data', 'db.json')

async function loadData () {
  let data = null
  try {
    const json = await fs.readFile(DB_FILE, 'utf8')
    data = json !== '' ? JSON.parse(json) : []
  } catch {
    myEmitter.emit('log:error', 'Cannot load DB file')
    myEmitter.emit('cli:error', '❌ An error has occured!!!')
    return
  }

  subscriptions = data
  myEmitter.emit('log:info', 'Database loaded')
  return data
}

async function saveData () {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(subscriptions))
  } catch {
    myEmitter.emit('log:error', 'Cannot save data')
    return
  }
  myEmitter.emit('log:info', 'Subscriptions updated')
}

function getSubByName(name) {
  const sub = subscriptions.find(subs => subs === name)
  return sub
}

function getSubs() {
  return subscriptions
}

async function deleteSub(name) {
  const sub = getSubByName(name)

  if (!sub) {
    myEmitter.emit('cli:error', '❌ You are not subscribed to', name.toUpperCase())
    return
  }
  subscriptions = subscriptions.filter(item => item !== name)
  myEmitter.emit('log:action', `Subscription ${name} deleted`)
  myEmitter.emit('cli:error', '🟡 You are not longer suscribed to', name.toUpperCase())
  await saveData()
}

async function addSub(name) {
  const exists = getSubByName(name)

  if (exists) {
    return myEmitter.emit('cli:error', '❌ You are already subscribed to', name.toUpperCase())
  }
  subscriptions.push(name)
  myEmitter.emit('log:action', `Subscription ${name} added`)
  myEmitter.emit('cli:error', `🔔 You are now subscribed to ${name.toUpperCase()} notifications.`)
  await saveData()
}

module.exports = {
  loadData,
  saveData,
  getSubByName,
  getSubs,
  deleteSub,
  addSub
}