// Carrega variáveis de ambiente e centraliza configurações sensíveis
// Pode ser expandido no futuro para usar dotenv.

function requireEnv(name, fallback = '') {
  const value = process.env[name]
  if (process.env.NODE_ENV === 'production' && !value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value || fallback
}

export const JWT_SECRET = requireEnv('JWT_SECRET', '');
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
export const REFRESH_TOKEN_IDLE_MINUTES =
  Number(process.env.REFRESH_TOKEN_IDLE_MINUTES || 30);
export const REFRESH_TOKEN_IDLE_MINUTES_PERSISTENT =
  Number(process.env.REFRESH_TOKEN_IDLE_MINUTES_PERSISTENT || 60 * 24 * 7);

// Google OAuth / Calendario Goolgle
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const GOOGLE_REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

// Scopes recomendados para integração com Calendar v3.
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  // Opcional: usado para validar/mostrar o e-mail conectado.
  'https://www.googleapis.com/auth/userinfo.email',
];

// Por padrão, usamos 'primary'. Se você preferir o e-mail como calendarId, o callback já sobrescreve.
export const GOOGLE_DEFAULT_CALENDAR_ID = process.env.GOOGLE_DEFAULT_CALENDAR_ID || 'primary';

// URL do frontend para redirecionar após o callback do Google.
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Chave (32 bytes base64) para criptografar refresh_token/access_token antes de salvar no DB.
export const GOOGLE_TOKEN_ENCRYPTION_KEY = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY || '';
