import express from 'express'
import db from '../db.js'

const router = express.Router()

// Rota para buscar dados reais da tabela basictables
router.get('/basictables', (req, res) => {
  const sql = 'SELECT id, User, ProjectName, team, Status, Budget FROM basictables'

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err)
      return res.status(500).json({ error: 'Erro ao consultar o banco de dados' })
    }

    res.json(results)
  })
})

export default router
