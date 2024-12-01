const jwt = require("jsonwebtoken");


const Auxiliars ={
    verifyToken: function (req, res) {
        const authHeader = req.headers.authorization;
console.log("Estoy aqui" + req.session.idUsuarioLogueado);
console.log("AuthHeader: "+authHeader);
  // Verificamos el token JWT
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token válido' });
  }

  const token = authHeader.split(' ')[1];

  console.log("token "+ token)
  let idUsuarioLogueado;
  try {
    const decoded = jwt.verify(token, 'Los eventos son lo mas '); 
    idUsuarioLogueado = decoded.id;
    console.log("id usuario" + idUsuarioLogueado);
    return idUsuarioLogueado;
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado', detalle: error.message });
  } 
    
    }
    
}

module.exports = Auxiliars