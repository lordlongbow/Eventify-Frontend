const connection = require('../config/db');


const Asistente = {

    crearAsistente: function(nombre,domicilio,email,estado, username, password, fotoRuta,callback){
    
                const sql = 'INSERT INTO asistente (nombre,domicilio,email,estado, username, password, fotoRuta) VALUES (?,?,?,?,?,?,?)';
                console.log( sql, [nombre,domicilio,email,estado] );
                connection.query(sql, [nombre,domicilio,email,estado, username, password, fotoRuta], callback);
      
    },
    modificarAsistente: function(id,nombre,domicilio,email,estado, callback){
        const sql = 'UPDATE asistente SET nombre = ?, domicilio = ?, email = ?, estado = ? WHERE idAsistente = ?';
        connection.query(sql, [nombre,domicilio,email,estado,id], callback);
    },
     borrarAsistente: function(id, callback){
        const sql = 'DELETE FROM asistente WHERE idAsistente = ?';
        connection.query(sql, [id], callback);
    },
    obtenerAsistentes: function(callback){
        const sql = 'SELECT * FROM asistente';
        connection.query(sql, callback);
    },
    obtenerAsistente: function(id, callback){
        const sql = 'SELECT * FROM asistente WHERE idAsistente = ?';
        connection.query(sql, [id], callback);
    },
    obtenerAsistenteXEmail: function(email){
        var email = email;
        const sql = 'SELECT * FROM asistente WHERE email = ?';

        return new Promise((resolve, reject)=> {
            connection.query(sql, [email], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        }) 

      
    },
    obtenerAsistentePorUsername: function(username){
        var username = username;
        const sql = 'SELECT * FROM asistente WHERE username = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [username], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
        
    },
    
        obtenerMiperfil: function (id) {
            const sql = `CALL ObtenerMiPerfil(?)`;
            
            return new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Error en la consulta SQL:', error);
                        reject(error);
                        console.log('Resultado de la consulta:', result[0]);
                        resolve(result[0]); 
                    }
                });
            });
        }
        
        
    
};

module.exports = Asistente;
