import express from 'express'
import db from '../db.js'

const router = express.Router()

// GET /api/clientes - lista de clientes com paginação e busca
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1
    const pageSize = parseInt(req.query.pageSize, 10) || 15
    const search = (req.query.search || '').toString().trim()

    const offset = (page - 1) * pageSize

    const whereClauses = []
    const params = []

    if (search) {
      whereClauses.push(
        '(c.nome LIKE ? OR c.telefone_principal LIKE ? OR c.telefone_secundario LIKE ? OR c.email LIKE ? OR p.nome LIKE ?)' 
      )
      const likeSearch = `%${search}%`
      params.push(likeSearch, likeSearch, likeSearch, likeSearch, likeSearch)
    }

    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : ''

    const [countRows] = await db.query(
      `SELECT COUNT(*) as total
       FROM clientes c
       LEFT JOIN profissionais p ON p.id = c.profissional_padrao_id
       ${whereSql}`,
      params
    )

    const total = countRows[0]?.total || 0

    const [rows] = await db.query(
      `SELECT 
         c.id,
         c.nome,
         c.telefone_principal,
         c.telefone_secundario,
         c.email,
         c.data_nascimento,
         c.data_cadastro,
         c.ativo,
         c.vip,
         c.frequencia,
         c.plano_ativo,
         c.pontos_fidelidade,
         c.desconto_personalizado,
         c.preferencia_horario,
         c.profissional_padrao_id,
         p.nome AS profissional_padrao_nome,
         c.observacoes
       FROM clientes c
       LEFT JOIN profissionais p ON p.id = c.profissional_padrao_id
       ${whereSql}
       ORDER BY c.data_cadastro DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    )

    res.json({
      items: rows,
      total,
      page,
      pageSize,
    })
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    next(error)
  }
})

export default router
