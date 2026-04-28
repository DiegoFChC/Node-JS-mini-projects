function corsMiddleware(req, res) {
  // Leemos los orígenes permitidos desde el .env
  const originsEnv = process.env.ALLOWED_ORIGIN
  const allowedOrigins = originsEnv.split(',')

  const origin = req.headers.origin

  // Validamos que el origen está permitido
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Cabeceras personalizadas permitidas
  res.setHeader('Access-Control-Max-Age', '86400') // Tiempo en caché permitido para no hacer preflights al mismo origen (24 horas)

  // Manejamos los preflights en caso de que el navegador lo envíe
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return true
  }

  return false
}

module.exports = { corsMiddleware }
