const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function deleteFile (fileName) {
  if (fileName.length === 0) {
    console.log((pc.red('Unspecified file name')))
    return
  }
  try {
    await fs.unlink(fileName)
    console.log(pc.green('The file was successfully removed'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(pc.red('File not found'))
    } else {
      console.log(pc.red('An error has ocurred'))
    }
  }
}