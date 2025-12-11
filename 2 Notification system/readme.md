# 🔔 Node Notification System (v1)

A small notification system built with Node.js using the native `EventEmitter`.
The objective is to understand how event-based communication works inside Node without using websockets or external libraries.

This version includes:
* Global event bus using EventEmitter
* Notification events
* System-level events
* Simple console interface to trigger events manually

## 📁 Project Structure

```bash
/
│ index.js                          # Entry point, starts the mini console
│
├── commands/                       # Individual command implementations
│   ├── commands.js                 # Commands code
│   ├── commandsList.js             # Command list
│   └── index.js                    # Exports all commands mapped by name
│
├── core/
│   ├── parser.js                   # Turns raw input into { base, args }
│   └── commandRouter.js            # Routes parsed commands to functions
│
└── events/
    ├── index.js                    # Initializes the emitter and exports it
    ├── systemEvents.js             # Handles system-level events (errors, warnings, logs)
    └── notificationEvents.js       # Handles user and notification related events
```

## ▶️ How to Run

Just start the project normally:

```bash
node index.js
```

You will see a prompt like:

```bash
>
```

Then you can trigger events manually:

```bash
> subscribe sms

> send sms Hi!!!
```

Type any command and press ENTER. (Example: `help`)

![Console](https://github.com/DiegoFChC/Node-JS-mini-projects/blob/main/Notification%20system/console.png?raw=true)

## 📜 License

MIT License — Free to use, modify, and learn from.
