const Evento = require("../models/eventoModel");
const jwt = require("jsonwebtoken");
const path = require('path');
const sharp = require('sharp');
const Auxiliars = require("../config/auxiliars");

const eventoController = {
 eventosTodos: async function(req,res){
    try {
      const eventos = await Evento.obtenerEventos();
      res.status(200).json({success: true ,eventos : eventos});
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener eventos", detalle: error });
    }

    },
 obtenerEvento: function(req,res){
   var id = req.params.id;

   Evento.obtenerEvento(id, (error, resultados) => {     
     if (error) {
       return res
         .status(500)
         .json({ error: "Error al obtener evento porque: ", detalle: error });
     }
     res.status(200).json(resultados);
   });
 },
 modificarEvento: function(req,res){
    var idEvento = req.params.id;

    const { nombre, fecha, ubicacion, descripcion } = req.body;
    Evento.obtenerEvento(idEvento, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al modificar evento porque: ", detalle: error });
      }
      if(result.length == 0){
        return res.status(400).json({ error: "Evento no existe" });
      }else{
        Evento.modificarEvento(
            idEvento,
            nombre,
            fecha,
            ubicacion,
            descripcion,
            (error, result) => {
              if (error) {
                return res
                  .status(500)
                  .json({ error: "Error al modificar evento porque: ", detalle: error });
              }
              res.status(200).json({menssage: "Modificaste tu evento!!", success: true});
            }
      );} 
    })
    
    
 },
 borrarEvento: function(req,res){
    var id = req.params.id;

    Evento.borrarEvento(id, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al borrar evento porque: ", detalle: error });
      }
      res.status(200).json("Lastima eliminaste tu evento");
    });
 },
 crearEvento: function(req, res) {
  try {
    const { nombre, fecha, ubicacion, descripcion } = req.body;
    const imageFile = req.file;
    if (!imageFile) {
      console.error('No se cargó ninguna imagen');
      return res.status(400).json({ error: 'No se ha cargado ninguna imagen' });
    }

    const imagePath = path.join(__dirname, '..', 'public', 'images', 'eventoimages', `${Date.now()}-${imageFile.originalname}`);
    console.log('Ruta de la imagen generada:', imagePath);

    sharp(imageFile.buffer)
      .resize(800)
      .toFile(imagePath, (err, info) => {
        if (err) {
          console.error('Error al procesar la imagen:', err);
          return res.status(500).json({ error: 'Error al procesar la imagen', detalle: err });
        }

        const fotoruta = `/images/eventoimages/${path.basename(imagePath)}`;
        console.log('Ruta almacenada en la base de datos:', fotoruta);

        var idUsuarioLogueado = req.session.idUsuarioLogueado;
        
        Evento.cargarEvento(nombre, fecha, ubicacion, descripcion, fotoruta, idUsuarioLogueado, (error, result) => {
          if (error) {
            console.error('Error al ejecutar la consulta SQL:', error);
            return res.status(500).json({ error: 'Error al crear el evento en la base de datos', detalle: error });
          }
          console.log('Evento creado con éxito:', result);
          res.status(200).json({ message: 'Evento creado exitosamente!', success: true });
        });
      });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error);
    res.status(500).json({ error: 'Error inesperado en el servidor', detalle: error });
  }
},
misEventos: async function (req, res) {
 
 let idUsuarioLogueado = Auxiliars.verifyToken(req, res);   

  try {

    const eventos = await Evento.obtenerMisEventos(idUsuarioLogueado);
    return res.status(200).json({success: true , eventos: eventos}); 
  } catch (error) {
    console.error('Error al obtener mis eventos:', error);
    return res.status(500).json({ error: 'Error al obtener mis eventos', detalle: error });
  }
}

};
module.exports = eventoController;  