const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL1124!",
  database: "employee_db"
});

class prompt {
  constructor() {}

  mainMenu() {
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
              this.buildRoster();
            })
            break;
          case "Add Employee":
            //testing cases
            console.log("Add Employee case works")
            addEmployee();  
            break;
          case "Update Employee Role":
            console.log("Update Employee Role case works")
            break;
          case "View all Roles":
            //testing cases
            console.log("View all roles case works")
            db.connect(function (err) {
              if (err) throw err;
              db.query("SELECT * FROM role;", function (err, results) {
                if (err) throw err;
                let choices = results.map((role) => ({
                  id: `${role.id}`,
                  title: `${role.title}`,
                  department: `${role.department_id}`,
                  salary: `${role.salary}`
                }));
                console.table(choices);
              })
            })
            break;
          case "View all Departments":
            //testing cases
            console.log("View all depts case works")
            db.query('SELECT * FROM department', function (err, results) {
              let choices = results.map((department) => ({
                id: `${department.id}`,
                department: `${department.name}`
              }));
              console.table(choices);
            })
            break;
        }
      });
  }
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
        choices: [db.query("SELECT * from role", function (err, result){
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
      console.log(response.firstName);
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) Value (${response.firstname}, ${response.lastName}, ${response.role}, ${response.manager})` , function (err, results) {
      return response;
      });
    })
}


//   updateEmployeeRole() {

//   }

//   addRole() {

//   }

//   addDepartment() {

//   }

// }

// module.exports = prompt;

new prompt().mainMenu();