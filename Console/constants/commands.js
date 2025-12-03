const commands = {
  LS: {
    command: 'ls',
    description: 'List files and directories'
  },
  CLEAR: {
    command: 'clear',
    description: 'Clear the console screen'
  },
  CREATE_FILE: {
    command: 'create file',
    description: 'Create a new file'
  },
  DELETE_FILE: {
    command: 'delete file',
    description: 'Delete a file'
  },
  READ_FILE: {
    command: 'read file',
    description: 'Read and display file contents'
  },
  WRITE_FILE: {
    command: 'write on file',
    description: 'Write text into a file'
  },
  CREATE_DIRECTORY: {
    command: 'create directory',
    description: 'Create a new directory'
  },
  DELETE_DIRECTORY: {
    command: 'delete directory',
    description: 'Delete an existing directory'
  },
  RENAME: {
    command: 'rename',
    description: 'Rename a file or directory'
  },
  HELP: {
    command: '--help',
    description: 'Show available commands'
  },
  EXIT: {
    command: 'exit',
    description: 'End Node JS process'
  }
}

module.exports = commands