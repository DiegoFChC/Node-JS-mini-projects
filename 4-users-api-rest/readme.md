## 📁 Project Structure

```bash
/
│ index.js                    # Entry point (crea el servidor)
│
├── server/
│   ├── server.js             # Configuración del servidor HTTP
│   └── router.js             # Routing manual (método + URL)
│
├── routes/
│   └── users.routes.js       # Rutas relacionadas a usuarios
│
├── controllers/
│   └── users.controller.js   # Lógica de cada endpoint
│
├── services/
│   └── users.service.js      # Lógica de negocio
│
├── data/
│   └── users.json            # "Base de datos"
│
├── utils/
│   ├── bodyParser.js         # Parseo del body
│   ├── sendResponse.js       # Helper para responder
│   └── urlParser.js          # Parse de URL y query params
│
└── errors/
    └── httpErrors.js         # Errores HTTP reutilizables
```