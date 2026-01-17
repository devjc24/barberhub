// Serviço de Comercial - Venda de Balcão
// Isola a lógica de acesso a dados e paginação das vendas de balcão.

import db from '../../db.js'

export async function listarVendasBalcao({ page = '1', limit = '50' }) {
  let pageNum = Math.max(parseInt(String(page), 10) || 1, 1)
  let limitNum

  if (limit === 'all') {
    limitNum = 0
  } else {
    limitNum = Math.max(parseInt(String(limit), 10) || 50, 1)
  }

  const offset = (pageNum - 1) * (limitNum || 0)

  const [countRows] = await db.promise().query('SELECT COUNT(*) AS total FROM vendas_balcao')
  const total = countRows[0].total

  let query =
    'SELECT id, data_venda, cliente_nome, total, status FROM vendas_balcao ORDER BY data_venda DESC'

  const params = []

  if (limitNum > 0) {
    query += ' LIMIT ? OFFSET ?'
    params.push(limitNum, offset)
  }

  const [rows] = await db.promise().query(query, params)

  const totalPages = limitNum > 0 ? Math.max(Math.ceil(total / limitNum), 1) : 1

  return {
    data: rows,
    total,
    page: pageNum,
    limit: limit === 'all' ? 'all' : limitNum,
    totalPages,
  }
}
