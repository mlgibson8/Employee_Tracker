const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connections.js');
const cTable = require('console.table');

const startMenu =() => {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "View all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "exit"
        ],

    })
    .then((answer) => {
        console.log(answer);
        switch (answer.start) {
            case "View all departments":
                viewDepartments();
                break;
            case "view all roles":
                viewRoles();
                break;
            case "view all employees":
                viewEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update an employee role":
                updateRole();
                break;
            case "exit":
                exit();
                break
        }
    });
};


const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
}