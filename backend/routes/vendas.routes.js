import express from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { listarVendasBalcao } from '../services/comercial/vendaBalcao.service.js'

const router = express.Router()

// Rota protegida para listar vendas de balcão com paginação
router.get('/comercial/venda-balcao', authMiddleware, async (req, res, next) => {
  try {
    const { page = '1', limit = '50' } = req.query

    const resultado = await listarVendasBalcao({ page, limit })

    return res.json(resultado)
  } catch (err) {
    console.error('Erro ao buscar vendas de balcão:', err)
    // Delega para o middleware global de erros, se houver detalhes extras
    return next(err)
  }
})

export default router
