const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function rename(args) {
  if (args.length === 0) {
    console.log(pc.red('Unspecified file or folder name'))
    return
  }

  const data = args.split(' ')
  const oldName = data[0]
  const newName = data[1]
  
  if (!oldName || !newName) {
    console.log(pc.red('You must indicate the old and new file/directory name'))
    return
  }

  try {
    await fs.rename(oldName, newName)
    console.log(pc.green(`${pc.blue(oldName)} was changed to ${pc.blue(newName)} successfully`))
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(pc.red(`Doesn't exist a file or directory with name ${oldName}`))
    } else {
      console.log(pc.red('An error has ocurred using rename'))
    }
  }
}