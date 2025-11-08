import jwt from 'jsonwebtoken';

/**
 * Crea un token de acceso (JWT) para un usuario.
 * @param {Object} payload 
 * @returns {Promise<string>}
 */
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d', // El token expira en 1 día
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}