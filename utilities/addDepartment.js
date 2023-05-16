const inquirer = require('inquirer');
const viewAllRoles = require('./viewAllRoles');
const viewAllEmployees = require('./viewAllEmployees');
const viewAllDepartments = require('./viewAllDepartments');
const addRole = require('./addRole');
const addEmployee = require('./addEmployee');
const updateEmployeeRole = require('./updateEmployeeRole');
const promptUser = require('./promptUser');



const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the new department?",
            name: 'name'
        }
    ])
    .then((data) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
            console.log("\nNew department added. See below:");
            viewAllDepartments();
        })
    })
};
module.exports.addDepartment();