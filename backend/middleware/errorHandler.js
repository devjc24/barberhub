// Middleware simples de tratamento de erros para centralizar respostas padrão

export function errorHandler(err, req, res, next) {
  console.error('Erro não tratado:', err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor.';

  res.status(status).json({ error: message });
}
