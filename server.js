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
      switch (answers.options) {
        case "View all employees":
          db.query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary FROM employee AS e JOIN role AS r ON r.id = e.role_id JOIN department AS d ON d.id = r.department_id;', function (err, results) {
            console.table(results);
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
          db.query("SELECT r.id, r.title, r.salary, d.name AS department FROM role AS r JOIN department AS d ON r.department_id = d.id;", function (err, results) {
            console.table(results);
            mainMenu();
          })
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            mainMenu();
          })
          break;
        case "Add Department":
          addDepartment();
          break;
        // Following additional cases and functions to be developed in future updates
        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;
        // case "View Employees by Manager":
        //   viewEmployeeByManager();
        //   break;
        // case "View Employees by Department":
        //   updateEmployeeByDepartment();
        //   break;
        // case "Delete Department":
        //   deleteDepartment();
        //   break;
        // case "Delete Roles":
        //   deleteRoles();
        //   break;
        // case "Delete Employees":
        //   deleteEmployee();
        //   break;
        // case "View Department Budget":
        //   viewDepartmentBudget();
        //   break;
      }
    });
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    const employeeRoles = results.map((roles) => ({
      name: `${roles.title}`,
      value: roles.id,
    }));
    db.query("SELECT * FROM employee", function (err, results) {
      const managerName = results.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.manager_id,
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
          mainMenu();
        })
    })
  })
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    const employeeNames = results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    db.query("SELECT * FROM role", function (err, results) {
      if (err) throw err;
      const employeeRoles = results.map((roles) => ({
        name: `${roles.title}`,
        value: roles.id,
      }));
      inquirer
        .prompt([{
            type: "list",
            message: "Which employee do you want to update?",
            choices: employeeNames,
            name: "employeeName"
          },
          {
            type: "list",
            message: "Which role do you want to assign to the selected employee?",
            choices: employeeRoles,
            name: "newRole"
          }
        ])
        .then(response => {
          db.connect(function (err) {
            if (err) throw err;
            const sql = `UPDATE employee SET ? WHERE id = ${response.employeeName}`;
            const obj = {
              role_id: response.newRole,
            }
            db.query(sql, obj, function (err, result) {
              if (err) throw err;
              mainMenu();
            });
          });

        })
    })
  })
}

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    const deptRoles = results.map((dept) => ({
      name: `${dept.name}`,
      value: dept.id,
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
        const sql = `INSERT INTO role SET ?`;
        const obj = {
          title: response.title,
          salary: response.salary,
          department_id: response.department
        }
        db.query(sql, obj, function (err, result) {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          mainMenu();
        });
      })
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
      db.connect(function (err) {
        if (err) throw err;
        const sql = 'INSERT INTO department SET ?';
        const obj = {
          name: response.deptName
        }
        db.query(sql, obj, function (err, results) {
          if (err) throw err;
          console.log(response.deptName + " has been added to departments.");
        })
      });
      mainMenu();
    })
}