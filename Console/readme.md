# 📘 Node Mini Shell

A small custom shell built with Node.js, created to learn how to build command parsers, routers, and a modular CLI architecture.
The project includes two different approaches to receiving user input:

1. `index_consola.js` — **Real-time console input** using Node’s readline module
2. `index_text_file.js` — **File-based console** using a .txt file + filesystem watcher

Both versions use the same internal modules:

* Command router
* Command parser
* Modular commands
* Prompt renderer

## 📁 Project Structure

```bash
/
│ index_consola.js         # Shell using real user input (readline)
│ index_text_file.js       # Shell using console.txt as input (fs.watch)
│ console.txt              # Only used by index_text_file.js
│
├── commands/              # Individual command implementations
│   ├── ls.js
│   ├── clear.js
│   ├── createFile.js
│   ├── deleteFile.js
│   ├── ...
│   └── index.js           # Exports all commands mapped by name
│
├── core/
│   ├── parser.js          # Turns raw input into { base, args }
│   ├── commandRouter.js   # Routes parsed commands to functions
│   └── printPrompt.js     # Displays the prompt
│
└── constants/
    └── commands.js        # Command list + short descriptions
```

## ▶️ How to Run (Console Mode)

This version uses your actual terminal and the readline module.

```bash
node index_consola.js
```

You will see a prompt like:

```bash
/path/to/your/project >
```

Type any command and press ENTER. (Example: `--help`)

![Console](https://github.com/DiegoFChC/Node-JS-mini-projects/blob/main/Console/Screenshot%20console.png?raw=true)

## ▶️ How to Run (Text File Mode)

This mode watches a .txt file and executes commands when it changes.

1. Run in terminal

```bash
node index_text_file.js
```

2. Write a command inside the file `index_text_file.js`:

```bash
--help
```

The shell detects the change **when you save** and executes it.

![Text file](https://github.com/DiegoFChC/Node-JS-mini-projects/blob/main/Console/Screenshot%20text%20file.png?raw=true)

## 📜 License

MIT License — Free to use, modify, and learn from.