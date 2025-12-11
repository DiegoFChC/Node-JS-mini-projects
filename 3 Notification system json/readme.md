# 🔔 Node Notification System (v1)

A modular notification system built with Node.js, designed to learn event-driven architecture, persistence, and logging using the native EventEmitter.

This version expands the basic project by introducing:

✅ New features in v2

* Persistent storage for subscriptions (data/db.json)
* Event-driven persistence handlers
* Centralized system logging (logs/app.log)
* Decoupled modules: commands → events → actions
* Cleaner separation of concerns and extendable architecture
* Improved error handling

Perfect for learning how real Node.js backend services coordinate actions through events.

## 📁 Project Structure

```bash
/
│ index.js                          # Entry point, starts the CLI
│
├── commands/                       # CLI command implementations
│   ├── commands.js                 # Command logic (emit events only)
│   ├── commandsList.js             # Command definitions
│   └── index.js                    # Maps commands to functions
│
├── core/
│   ├── parser.js                   # Turns raw input into { base, args }
│   ├── commandRouter.js            # Routes parsed commands to handlers
│   └── storage.js                  # Reads/writes the database file
│
├── events/
│   ├── index.js                    # EventEmitter instance (global bus)
│   ├── persistenceEvents.js        # Adds/removes subscriptions via storage
│   ├── notificationEvents.js       # Handles "send" notifications
│   └── systemEvents.js             # Logging (info, error, action)
│
├── data/
│   └── db.json                     # Persistent list of subscriptions
│
└── logs/
    └── app.log                     # Generated log file
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
> subscribe news
> send news Hello world!
> list
> unsubscribe news
> exit
```

Type any command and press ENTER. (Example: `help`)

![Console](https://github.com/DiegoFChC/Node-JS-mini-projects/blob/main/Notification%20system%20json/console.png?raw=true)

## 📜 License

MIT License — Free to use, modify, and learn from.
