import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) return res.status(401).json({ error: 'Sessão expirada, faça login novamente.' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Sessão expirada, faça login novamente.' })
  }
}
