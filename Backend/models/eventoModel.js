const connection = require('../config/db');
const Asistente = require('./asistenteModel');

const Evento ={ 
    obtenerEventos: function(callback){
        const sql = 'CALL ListarEventos;';
     
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
      

    },
    obtenerEvento: function(id, callback){
        const sql = 'SELECT * FROM evento WHERE idEvento = ?';
        
        connection.query(sql, [id], callback);
    },
    cargarEvento: function(nombre, fecha, ubicacion, descripcion, fotoRuta, idUsuarioLogueado, callback){
        //aca hay que relacionar el id del asistente Organizador
       
        const sql = 'INSERT INTO evento SET nombre= ?, fecha = ?, ubicacion = ?, descripcion = ?, fotoRuta = ?, idOrganizador = ?';
        connection.query(sql, [nombre, fecha, ubicacion, descripcion,fotoRuta, idUsuarioLogueado], callback);
    },
    modificarEvento: function(idEvento, nombre, fecha, ubicacion, descripcion, callback){
        //solo lo podra modificar el asistente organizador
        const sql = 'UPDATE evento SET nombre = ?, fecha= ?, ubicacion = ?, descripcion = ? WHERE idEvento = ?';
        connection.query(sql, [nombre, fecha, ubicacion, descripcion, idEvento], callback);
    },
    borrarEvento: function(id, callback){
        const sql = 'DELETE FROM evento WHERE idEvento = ?';
        connection.query(sql, [id], callback);
    },
    obtenerMisEventos: function(id, callback){
        const sql = 'SELECT * FROM evento WHERE idOrganizador = ?';
       
        return new Promise((resolve, reject) => {
            connection.query(sql, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }
};

module.exports = Evento;