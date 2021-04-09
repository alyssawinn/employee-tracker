const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');

const updateEmployees = () => {
    return inquirer.prompt (
        {
            type: 'list',
            name: 'starterAction',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ).then(nextAction => {
        if (nextAction.starterAction === 'View all departments') {
            db.query(`SELECT * FROM department`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                updateEmployees();
            })
        } else if (nextAction.starterAction === 'View all roles') {
            db.query(`SELECT role.id, role.title, role.salary, department.name AS department
                    FROM role
                    LEFT JOIN department ON role.department_id = department.id`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                updateEmployees();
            })
        } else if (nextAction.starterAction === 'View all employees') {
            db.query(`SELECT e.id, e.first_name, e.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(m.first_name," ",m.last_name) AS manager
                    FROM employee e
                    LEFT JOIN role ON e.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee m on e.manager_id = m.id;`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                updateEmployees();
            })
        } else if (nextAction.starterAction === 'Add a department') {
            return inquirer.prompt (
                {
                    type: 'input',
                    name: 'department',
                    message: 'New Department:'
                }
            ).then(newDepartment => {
                const param = [newDepartment.department];
                db.query(`INSERT INTO department (name)
                        VALUES (?)`, param, (err, result) => {
                            if (err) {
                                console.log('Department already exists');
                                updateEmployees();
                            } else {
                                console.log(`${param} has been added`);
                                updateEmployees();
                            }
                    })
            })
        } else if (nextAction.starterAction === 'Add a role') {
            db.query(`SELECT * FROM department`, (err, row) => {
                if (err) {
                    console.log(`Error: ${err}`);
                    updateEmployees();
                } else {
                    return inquirer.prompt ([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'New Role:'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Salary:'
                        },
                        {
                            type: 'list',
                            name: 'department',
                            choices: function() {
                                let choiceArray = [];
                                row.forEach(item => choiceArray.push(item));
                                return choiceArray;
                            },
                            message: 'Department for new role:'
                        }
                    ]).then(newRole => {
                        const param = [newRole.department];
                        db.query(`SELECT id FROM department WHERE name = ?`, param, (err, row) => {
                            if (err) {
                                console.log(`Error: ${err}`);
                                updateEmployees();
                            } else {
                                let departmentId = row[0].id;
                                const param = [newRole.title, newRole.salary, departmentId];
                                db.query(`INSERT INTO role (title, salary, department_id)
                                VALUES (?,?,?)`, param, (err, result) => {
                                    if (err) {
                                        console.log('Role may already exist or salary is not a decimal number');
                                        updateEmployees();
                                    } else {
                                        console.log(`The ${newRole.title} role has been added to the ${newRole.department} department`);
                                        updateEmployees();
                                    }
                            })
                            }
                        })
                        
                         
                    })
                }
                
            })
            
        }
    })
};

updateEmployees();
