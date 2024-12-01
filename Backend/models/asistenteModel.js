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


    /*
    obtenerMiperfil: function (id) {
        console.log("En el modelo obtenerMiperfil");
        
        const sql = `CALL ObtenerMiPerfil(?)`;
       
        connection.query(sql, [id], (error, result) => {
            if (error) {
                console.error('Error en la consulta SQL:', error);
            } else {
                console.log('Resultado de la consulta:', result[0]);
                return result[0]
            }
        });
    }*/ 
    
        obtenerMiperfil: function (id) {
            console.log("En el modelo obtenerMiperfil");
            const sql = `CALL ObtenerMiPerfil(?)`;
            
            return new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Error en la consulta SQL:', error);
                        reject(error); // Rechaza la promesa si hay un error
                    } else {
                        console.log('Resultado de la consulta:', result[0]);
                        resolve(result[0]); // Resuelve la promesa con el resultado
                    }
                });
            });
        }
        
        
    
};

module.exports = Asistente;

/* obtenerPerfil: function(id){
        console.log("en la funciona");
        const sql = 'SELECT nombre, domicilio, email, estado, username, fotoRuta FROM asistente WHERE idAsistente = ?';
        console.log(sql, [id]);
        return new Promise((resolve, reject) => {
            connection.query(sql, [id], (error, result) => {
              console.log("Ejecución del callback");
              if (error) {
                console.error("Error en la consulta SQL:", error);
                reject(error);
              } else {
                console.log("Resultado de la consulta:", result);
                resolve(result);
              }
            });
          }).catch(err => {
            console.error("Error al ejecutar la función obtenerPerfil:", err);
          });
          
      }, */