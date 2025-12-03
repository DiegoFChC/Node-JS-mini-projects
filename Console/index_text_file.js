const fs = require('node:fs/promises')
const pc = require('picocolors')
const parse = require('./core/parser') // Define comando y agumentos
const route = require('./core/commandRouter') // Llama a la función correspondiente
const printPrompt = require('./core/printPrompt')

const TERMINAL_FILE_NAME = 'console.txt';

(
  async () => {
    let terminalHandler
    try {
      terminalHandler = await fs.open(TERMINAL_FILE_NAME, 'r')
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error(`The file ${TERMINAL_FILE_NAME} doesn't exists`)
      } else {
        throw new Error('An error ocurred while opening terminal file.')
      }
    }

    console.log(pc.bold(pc.blue('>')), pc.green(pc.bold(__dirname)))

    terminalHandler.on('change', async () => {
      // Read command
      const size = (await terminalHandler.stat()).size
      const buffer = Buffer.alloc(size) // Espacio en memoria
      const offset = 0 // Desde donde empieza a llenar el buffer
      const length = size // Bytes a leer
      const position = 0 // Desde donde empieza a leer

      // Lee y guarda en el buffer
      await terminalHandler.read(buffer, offset, length, position)
      const command = buffer.toString('utf8')

      if (command === 'exit') {
        terminalHandler.close()
        process.exit(0)
      }
      
      const parsed = parse(command)
      await route(parsed)
      printPrompt()
    })

    const watcher = fs.watch(TERMINAL_FILE_NAME)

    for await (const event of watcher) {
      if (event.eventType === 'change') {
        terminalHandler.emit('change')
      }
    }
  }
)()