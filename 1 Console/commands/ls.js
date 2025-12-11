const fs = require('node:fs/promises')
const pc = require('picocolors')

module.exports = async function ls() {
  const files = await fs.readdir('.', { withFileTypes: true })

  for (const file of files) {
    const { name } = file
    const stats = await fs.stat(name)

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    console.log(
      `${fileType} ${
        fileType === 'f' ? pc.blue(name.padEnd(25)) : name.padEnd(25)
      } ${fileSize.toString().padEnd(10)} ${pc.green(fileModified)}`
    )
  }
}