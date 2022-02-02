const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL1124!",
    database: "employee_db",
});

class prompt {
    constructor () {}
  
    mainMenu() {
      inquirer
        .prompt([
          {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View all employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
          },
        ])
        .then((answers) => {
          // print user choice
          switch (answers.options) {
            case "View all employees":
              db.query('SELECT * FROM employee', function (err, results) {
                const choices = results.map((employee) => ({
                  id: `${employee.id}`,
                  name: `${employee.first_name} ${employee.last_name}` 
                }));
                console.table(choices);
              })
              break;
            case "Add Employee":
              db.query('SELECT * FROM employee', function (err, results) {
                const choices = results.map((employee) => ({
                  name: `${employee.first_name} ${employee.last_name}`, 
                  id: `${employee.id}`
                }));
                console.table(choices);
              })
              break;
            case "Update Employee Role":
              console.log("Role")
              break;
            case "View all Roles":
              db.query('SELECT * FROM role', function (err, results) {
                const choices = results.map((role) => ({
                  id: `${role.id}`,
                  title: `${role.title}`,
                  department: `${role.department_id}`,
                  salary: `${role.salary}` 
                }));
                console.table(choices);
              })
              break;
            case "View all Departments":
              db.query('SELECT * FROM department', function (err, results) {
                const choices = results.map((department) => ({
                  id: `${department.id}`,
                  department: `${department.name}`
                }));
                console.table(choices);
              })
              break;
        
          }
        });
    }
  
    addEmployee() {
  
    }
    
    updateEmployeeRole() {
  
    }
  
    addRole() {
  
    }
  
    addDepartment()
    {
  
    }
  
  }

module.exports = prompt;