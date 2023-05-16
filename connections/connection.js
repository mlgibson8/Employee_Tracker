//dependencies
const mysql2 = require('mysql2');

//connect to database
const connection = mysql2.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'pword',
        database: 'employee_db'
       
    },
    console.log('Connected to the employee database.')
); 
module.exports = connection;