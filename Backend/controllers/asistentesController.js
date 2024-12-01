const Asistente = require("../models/asistenteModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Auxiliars = require("../config/auxiliars");
const { Console } = require("console");

const asistenteController = {
  asistentesTodos: function (req, res) {
    Asistente.obtenerAsistentes((error, resultados) => {
      error
        ? console.log(error)
        : resultados.length == 0
        ? res.send("No existen asistentes")
        : res.json(resultados);
    });
  },
  cargarAsistentes: async function (req, res) { 
  const { nombre, domicilio, email, estado, username } = req.body;

  try {
    // Verificar si el asistente ya existe por email
    const result = await Asistente.obtenerAsistenteXEmail(email);
    if (result.length > 0) {
      return res.status(400).json({ error: "El asistente ya existe." });
    }

    // Hashear la contraseña (usando el email como base, como se indicó)
    const passwordHasheado = bcrypt.hashSync(email, 10);

    // Validar y procesar la imagen
    const imageFile = req.file;


    if (imageFile) {
      
    // Crear ruta para almacenar la imagen
      const imagePath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        'avatarAsistentes',
        `${Date.now()}-${imageFile.originalname}`
      );
      
    // Procesar la imagen con sharp
      await sharp(imageFile.buffer)
        .resize(800)
        .toFile(imagePath);

      fotoruta = `/images/avatarAsistentes/${path.basename(imagePath)}`;
      console.log("Ruta almacenada en la base de datos:", fotoruta);
    } else {
      // Ruta de la imagen predeterminada
      fotoruta = '/images/default-avatar.jpg';
      console.log("Usando imagen predeterminada:", fotoruta);
    }



    // Crear el asistente en la base de datos
    await Asistente.crearAsistente(
      nombre,
      domicilio,
      email,
      estado,
      username,
      passwordHasheado,
      fotoruta 
    );

    res.status(200).json("Asistente creado con éxito.");
  } catch (error) {
    console.error("Error en cargarAsistentes:", error);
    res.status(500).json({ error: "Error al crear asistente", detalle: error });
  }
  },
  modificarAsistente: function (req, res) {
    const { id } = req.params;
    const { nombre, domicilio, email, estado } = req.body;
    Asistente.modificarAsistente(
      id,
      nombre,
      domicilio,
      email,
      estado,
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error al modificar asistente", detalle: error });
        }
        res.status(200).json("Asistente modificado");
      }
    );
  },
  borrarAsistente: function (req, res) {
    const { id } = req.params;
    Asistente.borrarAsistente(id, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al borrar asistente", detalle: error });
      }
      res.status(200).json("Asistente borrado");
    });
  },
  obtenerAsistente: function (req, res) {
    const { id } = req.params;
    Asistente.obtenerAsistente(id, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al obtener asistente", detalle: error });
      }
      res.status(200).json(result);
    });
  },
  obtenerMiPerfil: (req, res) => {
    console.log("en la funcion");

    const id = Auxiliars.verifyToken(req, res);
    console.log('ID del usuario logueado:', id);
    console.log(req.session);
  
    // Verificar si el ID de usuario está presente
    Asistente.obtenerAsistente(id, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al obtener asistente", detalle: error });
      }
      return res.status(200).json(result, console.log(result));
    });
  },
  loginAsistente: async function (req, res) {
    const { username, password } = req.body;
 
    try {

      const usuario = await Asistente.obtenerAsistentePorUsername(username);
  
      if (usuario.length == 0) {

        return res.status(400).json({ error: "Asistente no existe" });
      }
      


      const passwordHasheado = usuario[0].password;
      if (bcrypt.compareSync(password, passwordHasheado)) {
      
        const token = jwt.sign({ id: usuario[0].idAsistente }, process.env.JWT_SECRET || "Los eventos son lo mas ");
        req.session.token = token;
        req.session.idUsuarioLogueado = usuario[0].idAsistente;
        console.log("Token generado:", token);
        console.log("ID del usuario logueado:", req.session.idUsuarioLogueado);
        return res.status(200).json({ success: true , mensaje: "Asistente logueado", token });
      } else {
       
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({ error: "Error al obtener asistente", detalle: error });
    }
  },
  registroAsistente: async (req, res) => {
    let { nombre, domicilio, email, estado, username, password } = req.body;
    console.log("en registro body es:" + req.body);
    try {
      const usuario = await Asistente.obtenerAsistenteXEmail(email);
      console.log(usuario)
      if (usuario.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "El usuario ya existe" });
      }

      // Encriptar la contraseña
      var claveHasheada = await bcrypt.hash(password, 10);
     
      estado = false;
      // Crear el asistente en la base de datos
       await Asistente.crearAsistente(
        nombre,
        domicilio,
        email,
        estado,
        username,
        claveHasheada
      );
      console.log("paso")
      res.status(201).json({ success: true, message: "Registro exitoso" });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.status(500).json({ success: false, message: "Error en el registro" });
    }
  },
  cerrarSesion: function (req, res) {
    req.session.destroy();

    res.status(200).json({ success: true, message: "Sesion cerrada" });
  },
perfilAsistente: async function (req, res) {
  console.log("En la función perfilAsistente");
  console.log("Cuerpo de la petición:", req.body);
  console.log("Parámetros de la URL:", req.params);

  const id = req.params.id;
  if (!id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
  }

  console.log("ID del usuario logueado:", id);

  try {
      // Espera el resultado del modelo
      const result = await Asistente.obtenerMiperfil(id);
      console.log("Resultado obtenido:", result);

      if (!result) {
          return res.status(404).json({ error: "Perfil no encontrado" });
      }

      console.log("Perfil obtenido:", result);
      return res.status(200).json(result);
  } catch (error) {
      console.error("Error al obtener el perfil:", error);
      return res.status(500).json({ error: "Error al obtener el perfil", detalle: error.message });
  }
}

};

module.exports = asistenteController;

