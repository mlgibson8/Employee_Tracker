const viewAllDepartments = require('./viewAllDepartments');
const viewAllRoles = require('./viewAllRoles');
const viewAllEmployees = require('./viewAllEmployees');
//const addDepartment = require('./addDepartment');
const addRole = require('./addRole');
const addEmployee = require('./addEmployee');
const updateEmployeeRole = require('./updateEmployeeRole');
const index = require('./index');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'pword',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);




const promptUser = () => {
    return inquirer.init([
        {
            type: 'list',
            message: "Which action would you like to take?",
            name: 'selection',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ])
    .then((data) => {
        switch (data.selection) {
            case "View all departments":
                viewAllDepartments();
                init();
                break;

            case "View all roles":
                viewAllRoles();
                init();
                break;
                
            case "View all employees":
                viewAllEmployees();
                init();
                break;
            
            case "Add a department":
                //addDepartment();
                //init();
                break;
        
            case "Add a role":
                addRole();
               init();
                break;
            
            case "Add an employee":
                addEmployee();
               init();
                break;
                
            case "Update an employee role":
                updateEmployeeRole();
               init();
                break;
        }
    })
};

// Initiates user prompt
promptUser();