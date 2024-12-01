const jwt = require("jsonwebtoken");

//Auxiliars utiliza funciones anexas que se usan en el software en general

const Auxiliars ={
    verifyToken: function (req, res) {
        const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token válido' });
  }

  const token = authHeader.split(' ')[1];

  let idUsuarioLogueado;
  try {
    const decoded = jwt.verify(token, 'Los eventos son lo mas '); 
    idUsuarioLogueado = decoded.id;

    return idUsuarioLogueado;
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado', detalle: error.message });
  } 
    
    }
    
}

module.exports = Auxiliars