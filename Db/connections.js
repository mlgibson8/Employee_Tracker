//dependencies
const mysql2 = require('mysql2');

//connect to database
const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pword',
        database: 'employee_db'
       
    },
    console.log('Connected to the employee database.')
); 
module.exports = db;