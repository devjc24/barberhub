import jwt from 'jsonwebtoken'

const JWT_SECRET = 'chave_secreta_super_segura' // ideal: usar variável de ambiente em produção

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) return res.status(401).json({ error: 'Sessão expirada, faça login novamente.' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Sessão expirada, faça login novamente.' })
  }
}
