const express = require('express');
const router = require('express').Router();
const participacionController = require('../controllers/participacionController');

router.post('/participar', participacionController.registrarAsistencia);
router.get('/listarAsistentesConfirmados/:id', participacionController.listarConfirmados);
router.get('/misParticipaciones', participacionController.misParticipaciones);
router.get('/detallesParticipacion/:id', participacionController.detallesParticipacion);
router.put('/confirmarAsistencia/:id', participacionController.confirmarAsistencia);
  

module.exports = router;