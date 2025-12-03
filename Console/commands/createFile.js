const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function createFile (fileName) {
  if (fileName.length === 0) {
    console.log(pc.red('Unspecified file name'))
    return
  }
  try {
    const handleFile = await fs.open(fileName, 'r')
    handleFile.close()
    console.log(pc.red(`The file ${fileName} already exist`))
  } catch (err) {
    const newFilehandle = await fs.open(fileName, 'w')
    newFilehandle.close()
    console.log(pc.green('File created successfully'))
  }
}