// backend/db.js
// Conexão com MariaDB/MySQL usando pool e promises
import mysql from 'mysql2'

const pool = mysql
  .createPool({
    host: 'localhost',
    user: 'devjc',
    password: 'mJpz2J0JE',
    database: 'barberhub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise()

export default pool
