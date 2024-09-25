const jwt = require('jsonwebtoken');
require('dotenv').config();

// Definisci o importa refreshTokens
const refreshTokens = []; // O importa da un altro file

function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return list;
  }
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name)
      return;
    const value = rest.join('=').trim();
    if (!value)
      return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

function authenticateToken(req, res, next) {
  const cookies = parseCookies(req);
  const token = cookies.jwt;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Verifica se il token è stato revocato
  if (refreshTokens.includes(token)) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.cookie('jwt', '', { expires: new Date(0) });
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

module.exports = { authenticateToken, generateAccessToken, parseCookies, refreshTokens };