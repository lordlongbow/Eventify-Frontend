const Auxiliars = require("../config/auxiliars");
const Participacion = require("../models/participacionModel");

const participacionController = { 
    registrarAsistencia: function(req, res) {
        const eventoId = req.body.body.eventoId;
        const asistenteId = req.body.body.asistenteId;

        console.log('Evento ID:', eventoId);
        console.log('Asistente ID:', req.body.asistenteId);
        console.log('Body: :', req.body);
        // Verificar si los parámetros están definidos
        if (!eventoId || !asistenteId) {
            return res.status(400).send('Faltan parámetros');
        }
    
        // Llamar al modelo
        Participacion.registrarAsistencia(eventoId, asistenteId, function(err, result) {
            if (err) {
                console.error('Error al registrar asistencia:', err);
                return res.status(500).send('Error interno al registrar asistencia');
            }
    
            console.log('Asistencia registrada:', result);
            return res.status(200).json({mesage:'Asistencia registrada'});
        });
    },
    confirmarAsistencia: function(req, res) {
        console.log("Confirmar Asistencia controller llamado " + req.params.id + " idAsistente " + req.body.body.asistenteId+ "usuairo " + req.body.body.idUsuarioLogueado);
    
        // Obtener los parámetros
        const idEvento = req.params.id;
        const idAsistente = req.body.body.asistenteId; // Asegúrate de que no esté anidado como req.body.body.idAsistente
        const usuarioLogueadoId = req.body.body.idUsuarioLogueado;
    
        console.log("Id del usuario logueado: " + usuarioLogueadoId);
        console.log("Id del asistente: " + idAsistente + " y el id del evento: " + idEvento);
    
        // Verificar si los parámetros están definidos
        if (!idEvento || !idAsistente || !usuarioLogueadoId) {
            console.log("Faltan parámetros");
            return res.status(400).send("Faltan parámetros");
        }
    
        // Llamar al modelo
        Participacion.confirmarAsistencia(idEvento, idAsistente, usuarioLogueadoId, function(err, result) {
            if (err) {
                console.error('Error al confirmar asistencia:', err);
                return res.status(500).send('Error interno al confirmar asistencia');
            }
    
            console.log('Asistencia confirmada/desmarcada correctamente.');
            return res.status(200).json({mensage : "Asistencia actualizada correctamente"});
        });
    },
    listarConfirmados: function (req, res) {
        const idEvento = req.params.id; 
        console.log("id del evento " + idEvento);
    
        // Verificar si los parámetros están definidos
        if (!idEvento) {
            console.log("Falta el id del evento");
            return res.status(400).send('Faltan parámetros');
        }
    
        Participacion.listarAsistentesConfirmados(idEvento, function (err, result) {
            if (err) {
                console.error('Error al listar asistentes confirmados:', err);
                return res.status(500).send('Error interno al listar asistentes confirmados');
            }
    
            console.log('Asistentes confirmados:', result);
            return res.status(200).json({ asistentes: result });
        });
    },
    misParticipaciones: function (req, res) {
        const idAsistente = Auxiliars.verifyToken(req, res);
        console.log("id del asistente " + idAsistente);
    
        // Verificar si los parámetros están definidos
        if (!idAsistente) {
            console.log("Falta el id del asistente");
            return res.status(400).send('Faltan parámetros');
        }
    
        Participacion.listarMisParticipaciones(idAsistente, function (err, result) {
            if (err) {
                console.error('Error al listar mis participaciones:', err);
                return res.status(500).send('Error interno al listar mis participaciones');
            }
    
            console.log('Mis participaciones:', result);
            return res.status(200).json({ participaciones: result });
        });
    },
    detallesParticipacion(req,res) { 
        const idPaticipacion = req.params.id;

        console.log("id de la participacion " + idPaticipacion);
    
        // Verificar si los parámetros están definidos
        if (!idPaticipacion) {
            console.log("Falta el id de la participacion");
            return res.status(400).send('Faltan parámetros');
        }
    
        Participacion.detallesParticipacion(idPaticipacion, function (err, result) {
            if (err) {
                console.error('Error al listar mis participaciones:', err);
                return res.status(500).send('Error interno al listar mis participaciones');
            }
    
            console.log('Mis participaciones:', result);
            return res.status(200).json({ participaciones: result });  
        });
  
    }

};


module.exports = participacionController;
