const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function readFile(fileName) {
  if (fileName.length === 0) {
    console.log(pc.red('Unspecified file name'))
    return
  }

  try {
    const fileSize = (await fs.stat(fileName)).size

    const fileHandle = await fs.open(fileName, 'r')
    const buffer = Buffer.alloc(fileSize)
    const offset = 0
    const length = fileSize
    const position = 0

    await fileHandle.read(buffer, offset, length, position)
    console.log(buffer.toString('utf8'))
    fileHandle.close()
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(pc.red(`The file ${fileName} doesn't exist`))
    } else {
      console.log(pc.red('An error has ocurred'))
    }
  }
}