const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_gestion_eventos'
});

connection.connect((err) => {
    err? console.log('El errorr es: ' +err) : console.log('Conectado');    
});

module.exports = connection; 