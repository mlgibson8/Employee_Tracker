//requirements
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

const inquirer = require('inquirer');
// starts the CLI prompt, which is a list of options that link to other functions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'selection',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ])
    .then((data) => {
        // switch statement that links the user's selection to the appropriate function
        switch (data.selection) {
            case "View all departments":
                viewAllDepartments();
                break;

            case "View all roles":
                viewAllRoles();
                break;
                
            case "View all employees":
                viewAllEmployees();
                break;
            
            case "Add a department":
                addDepartment();
                break;
        
            case "Add a role":
                addRole();
                break;
            
            case "Add an employee":
                addEmployee();
                break;
                
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "Exit":
                exit();
                break;
        }
    })
};

// Initiates user prompt
promptUser();
// function to view all departments
const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
// function to view all roles
const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
// function to view all employees set up with the views that we  seeded for formatting
const viewAllEmployees = () => {
    db.query(`SELECT * from Employee`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
// function to add a department
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
            console.log("\nNew department added.");
            viewAllDepartments();
        })
    })
}
// function to add a role in a department
const addRole = () => {
    let departmentArray = [];
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].name);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the new role?",
                name: 'title',
            },
            {
                type: 'input',
                message: "What is the salary of the new role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "What department is the role under?",
                name: 'department',
                choices: departmentArray
            }
        ])
        .then((data) => {
            // pulls the department id from the department table
            db.query(`SELECT id FROM department WHERE department.name = ?`, data.department, (err, results) => {
                let department_id = results[0].id;
            // inserts the new role into the role table and giving a foreign key for the department table
            db.query(`INSERT INTO role(title, salary, department_id)
            VALUES (?,?,?)`, [data.title, data.salary, department_id], (err, results) => {
                console.log("\nNew role added.");
                viewAllRoles();
            })
            });
        })
    })
}
// function to add an employee
const addEmployee = () => {
    const roleArray= [];
    const employeeArray= [];
    //pulls the rolls from the role table and populates the role array
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
    //pulls the employees from the employee table and populates the employee array
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }
        // starts the inquirer prompt
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last_name',
            },
            //sets a list of roles to choose from pulling from the role table
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleArray
            },
            {
                type: 'list',
                message: "Does the employee have a manager?",
                name: 'has_manager',
                choices: ["Yes", "No"]
            }
        ]).then((data) => {
            let roleName = data.role;
            let first_name = data.first_name;
            let last_name = data.last_name;
            let role_id = '';
            let manager = '';
            // populates role id
            db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                role_id = results[0].id;
            });
            if (data.has_manager === "Yes")
            // if the employee has a manager, the manager is selected from the employee array by id
             {
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: "Please select the employees manager",
                    name: 'manager',
                    choices: employeeArray
                    }   
                ]).then((data) => {
                    // get role id
                    db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                        role_id = results[0].id;
                    })
                    db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.manager.split(" "), (err, results) => {
                        manager = results[0].id;
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager], (err, results) => {
                            console.log("\nNew employee added. See below:");
                            viewAllEmployees();
                        })
                    })
                })
            } else 
            // if the employee does not have a manager, the manager is set to null
            {
            manager = null;
                // get role id
                db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                    role_id = results[0].id;
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES (?,?,?,?)`, [data.first_name, data.last_name, role_id, manager], (err, results) => {
                        console.log("\nNew employee added. See below:");
                        viewAllEmployees();
                    })
                })
            }
        })
    })
})
}

// function to update an employee role
const updateEmployeeRole = () => {
    const roleArray= [];
    const employeeArray= [];
    // pulls role list from role table
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
    // pulls employee list from employee table
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }
        return inquirer.prompt([
            {
                type: 'list',
                message: "Which employee do you want to update?",
                name: 'employee',
                choices: employeeArray
            },
            {
                type: 'list',
                message: "What is the employee's new role?",
                choices: roleArray
            },
        ]).then((data) => {
            // pulls the roll id from the role table then pulls the employee id from the employee table and updates the employee role
            db.query(`SELECT id FROM role WHERE role.title = ?;`, data.role, (err, results) => {
                role_id = results[0].id;
                db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.employee.split(" "), (err, results) => {
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [role_id, results[0].id], (err, results) => {
                        console.log("\nEmployee role updated. See below:");
                        viewAllEmployees();
                    })
                })

            })
        })
    })
})
}
const exit = () => {
    console.log("\nsee you later!");
    process.exit();
}