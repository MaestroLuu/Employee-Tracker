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

//mainMenu is not displaying table when called after another function
function mainMenu() {
  inquirer
    .prompt([{
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["View all employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    }, ])
    .then((answers) => {
      switch (answers.options) {
        case "View all employees":
          db.connect(function(err) {
            if (err) throw err;
            db.query('SELECT * FROM employee', function (err, results) {
              let choices = results.map((employee) => ({
              id: `${employee.id}`,
              name: `${employee.first_name} ${employee.last_name}`,
              // value: employee,
            }));
            console.table(choices);
            });
            mainMenu();
          })
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
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
            mainMenu();
          })
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
            mainMenu();
          })
          break;
        case "Add Department":
          addDepartment();
          break;
      }
    });
}

//insert function not working
function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    const employeeRoles = results.map((roles) => ({
      name: `${roles.title}`,
      value: roles,
    }));
    db.query("SELECT * FROM employee", function (err, results) {
      const managerName = results.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager,
      }));

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
            choices: employeeRoles,
            name: "role"
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerName,
            name: "manager"
          }
        ])
        .then(response => {
          db.connect(function(err) {
            if (err) throw err;
            const sql = `INSERT INTO employee SET ?`;
            const obj = {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.role,
              manager_id: response.manager
            }
            db.query(sql, obj, function (err, result) {
              if (err) throw err;
              console.log(`${response.firstname} ${response.lastName} has been added to database.`);
            });
          });
          mainMenu();
        })
    })
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
      mainMenu();
    })

}

//insert function not working
function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    const deptRoles = results.map((dept) => ({
      name: `${dept.name}`,
      value: dept,
    }));

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
          choices: deptRoles,
          name: "department"
        }
      ])
      .then(response => {
        db.query(`INSERT INTO role (title, salary, department_id) Value (${response.title}, ${response.salary}, ${response.department_id})`, function (err, results) {
          return response;
        });
        console.log(response.title + " has been added to the database.");
        mainMenu();
      })
  })
}

//insert function not working
function addDepartment() {
  inquirer
    .prompt([{
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"
    }])
    .then(response => {
      db.connect(function (err) {
        if (err) throw err;
        const sql = `INSERT INTO department (name) VALUES (${response.deptName});`;
        db.query(sql, function (err, results) {
          if (err) throw err;
          console.log(response.deptName + " has been added to departments.");
        })
      });
      mainMenu();
    })
}