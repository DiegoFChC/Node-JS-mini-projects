import { Router } from 'express'
import {
  deleteSessionHandler,
  getSessionsHandler,
} from '../controllers/session.controller'

export const sessionRoutes = Router()

// prefix: /sessions
sessionRoutes.get('/', getSessionsHandler)
sessionRoutes.delete('/:id', deleteSessionHandler)
