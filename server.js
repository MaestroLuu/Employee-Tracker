const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL1124!",
  database: "employee_db"
});

mainMenu();

function mainMenu() {
  inquirer
    .prompt([{
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["View all employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    }, ])
    .then((answers) => {
      //checking responses to ensure values are correct
      console.log(answers.options);

      switch (answers.options) {
        case "View all employees":
          //testing cases
          console.log("View all Employee case works")
          db.query('SELECT * FROM employee', function (err, results) {
            let choices = results.map((employee) => ({
              id: `${employee.id}`,
              name: `${employee.first_name} ${employee.last_name}`
            }));
            console.table(choices);
          })
          mainMenu();
          break;
        case "Add Employee":
          addEmployee();
          mainMenu();
          break;
        case "Update Employee Role":
          // create function below
          console.log("Update Employee Role case works")
          mainMenu();
          break;
        case "View All Roles":
          db.query("SELECT * FROM role;", function (err, results) {
            let choices = results.map((role) => ({
              id: `${role.id}`,
              title: `${role.title}`,
              department: `${role.department_id}`,
              salary: `${role.salary}`
            }));
            console.table(choices);
          })
          mainMenu();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          db.query('SELECT * FROM department', function (err, results) {
            let choices = results.map((department) => ({
              id: `${department.id}`,
              department: `${department.name}`
            }));
            console.table(choices);
          })
          mainMenu();
          break;
        case "Add Department":
          addDepartment();
          mainMenu();
          break;
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([{
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        //figure out how to retrieve data from role table
        choices: [db.query("SELECT * from role", function (err, result) {
          if (err) throw err;
          return result.title;
        })],
        name: "role"
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [db.query("SELECT * from role")],
        name: "manager"
      }
    ])
    .then(response => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) Value (${response.firstname}, ${response.lastName}, ${response.role}, ${response.manager})`, function (err, results) {
        return response;
      });
    })
}

//still need to write update function
function updateEmployeeRole() {
  inquirer
    .prompt([{
        type: "list",
        message: "Which employee do you want to update?",
        // ask for help
        choices: ["import db table column"],
        name: "employeeName"
      },
      {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        //help 
        choices: [],
        name: "newRole"
      }
    ])
    .then(response => {
      //get correct sql
      db.query(`UPDATE employee SET  (title, salary, department_id) Value (${response.title}, ${response.salary}, ${response.department_id})`, function (err, results) {
        return response;
      });
    })

}

function addRole() {
  inquirer
    .prompt([{
        type: "input",
        message: "What is the name of the role?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary"
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        //figure out how to retrieve data from role table
        choices: [db.query("SELECT * from department", function (err, result) {
          if (err) throw err;
          return result;
        })],
        name: "department"
      }
    ])
    .then(response => {
      db.query(`INSERT INTO role (title, salary, department_id) Value (${response.title}, ${response.salary}, ${response.department_id})`, function (err, results) {
        return response;
      });
    })
}

function addDepartment() {
  inquirer
    .prompt([{
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"
    }])
    .then(response => {
      db.query(`INSERT INTO department (name) Value (${response.deptName})`, function (err, results) {
        return response;
      });
      mainMenu();
    })
}