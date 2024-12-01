const express = require('express');
const multer = require('multer');
const router = require('express').Router();
const eventoController = require('../controllers/eventoController');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });


router.get('/todos', eventoController.eventosTodos);
router.get('/misEventos', eventoController.misEventos);
router.get('/:id', eventoController.obtenerEvento);
router.post('/cargar', upload.single('foto'), eventoController.crearEvento);
router.delete('/borrar/:id', eventoController.borrarEvento);
router.put('/modificar/:id', eventoController.modificarEvento);

  
module.exports = router;
   