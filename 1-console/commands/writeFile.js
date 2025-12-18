const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function writeFile(args) {
  if (args.length === 0) {
    console.log(pc.red('Unspecified file name'))
    return
  }

  const data = args.split(' ')
  const pathName = data[0]
  const newText = data.join(' ').substring(pathName.length + 1)

  try {
    // Exists?
    await fs.stat(pathName)

    const fileHandle = await fs.open(pathName, 'a')
    fileHandle.write(`${newText} `)
    fileHandle.close()
    console.log(pc.green('Writing was successful'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(pc.red(`The file ${args} doesn't exist`))
    } else {
      console.log(pc.red('An error has ocurred'))
    }
  }
}