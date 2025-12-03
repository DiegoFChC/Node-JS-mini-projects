const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function deleteDirectory(fileName) {
  if (fileName.length === 0) {
    console.log(pc.red('Unspecified file name'))
    return
  }
  try {
    // const handleDire
    await fs.opendir(fileName)
    await fs.rm(fileName, {
      force: true,
      recursive: true
    })
    console.log(pc.green('Folder removed successfully'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(pc.red(`The folder ${fileName} doesn't exist`))
    } else {
      console.log(pc.red('An error has occurred'))
    }
  }
}