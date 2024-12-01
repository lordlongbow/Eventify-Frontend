const express = require('express');
const router = require('express').Router();
const asistenteController = require('../controllers/asistentesController');

router.get('/todos', asistenteController.asistentesTodos);
router.get('/:id', asistenteController.obtenerAsistente);
router.get('/miPerfil/:id', asistenteController.perfilAsistente);
router.post('/cargar', asistenteController.cargarAsistentes);
router.post('/registro', asistenteController.registroAsistente);
router.post('/login', asistenteController.loginAsistente);
router.post('/logout', asistenteController.cerrarSesion);
router.delete('/borrar/:id', asistenteController.borrarAsistente);
router.put('/modificar/:id', asistenteController.modificarAsistente);


  
module.exports = router;      