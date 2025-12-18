const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function createDirectory(fileName) {
  if (fileName.length === 0) {
    console.log(pc.red('Unspecified file name'))
    return
  }
  try {
    await fs.mkdir(fileName)
    console.log(pc.green('Folder created successfully'))
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(pc.red(`The folder ${fileName} already exist`))
    } else {
      console.log(pc.red(`An error has occurred`))
    }
  }
}