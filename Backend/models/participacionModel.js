const connection = require('../config/db');

const Participacion = {
    registrarAsistencia: function(idEvento, idAsistente, callback) {
        console.log("idEvento: " + idEvento);
        console.log("idAsistente: " + idAsistente);
    
        // Consulta SQL para insertar en la tabla 'participacion'
        const sql = 'INSERT INTO participacion (idEvento, idAsistente, confirmacion) VALUES (?, ?, ?)';
    
        // Aquí pasamos las variables correctas
        connection.query(sql, [idEvento, idAsistente, 0], function(err, results) {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return callback(err); // Pasar el error al callback
            }
    
            console.log('Resultado de la consulta:', results);
            callback(null, results); // Pasar el resultado al callback si no hay error
        });  
    },
    confirmarAsistencia: function(idEvento, idAsistente, idOrganizador, callback) {
        console.log("En el modelo: idEvento = " + idEvento + ", idAsistente = " + idAsistente + ", idOrganizador = " + idOrganizador);
        const sql = 'CALL ConfirmarAsistencia(?,?,?)';
        connection.query(sql, [idEvento, idAsistente, idOrganizador], function(err, results) {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return callback(err);
            }
    
            console.log('Resultado de la consulta:', results);
            callback(null, results);
        });
    },
    listarAsistentesConfirmados: function( idEvento, callback) {
        console.log("en el Model ");
        const sql = 'SELECT asistente.nombre, asistente.username, asistente.fotoRuta, asistente.estado, asistente.idAsistente FROM participacion JOIN asistente ON participacion.idAsistente = asistente.idAsistente WHERE participacion.idEvento = ?';
        connection.query(sql, [idEvento], callback);
    },
    listarMisParticipaciones: function(idAsistente, callback) {
        console.log("en el Model ");
        const sql = 'SELECT evento.idEvento, evento.nombre, participacion.confirmacion, participacion.idParticipacion FROM participacion JOIN evento ON participacion.idEvento = evento.idEvento WHERE participacion.idAsistente = ? && participacion.confirmacion = 1';
        connection.query(sql, [idAsistente], callback);
    },
    detallesParticipacion: function(idPaticipacion, callback) {
        console.log("en el Model ");
        const sql = 'SELECT asistente.nombre AS nombreAsistente, asistente.username, evento.nombre AS nombreEvento, evento.fecha, evento.ubicacion FROM participacion JOIN asistente ON asistente.idAsistente = participacion.idAsistente JOIN evento ON evento.idEvento = participacion.idEvento WHERE participacion.idParticipacion = ?;';
        connection.query(sql, [idPaticipacion], callback);
    }

};

module.exports = Participacion