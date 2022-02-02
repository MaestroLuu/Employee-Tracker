// import packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL1124!",
  database: "employee_db",
});

// get students from db
// db.query("SELECT * FROM students", function (err, results) {
//   // create an array of inquirer choice objects from the students
//   const choices = results.map((student) => ({
//     name: `${student.first_name} ${student.last_name}`,
//     value: student,
//   }));
//   // prompt user
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
            name: `${employee.first_name} ${employee.last_name}`, 
            id: `${employee.id}`
          }));
          console.table(choices);
        })
        break;
      case "Add Employee":
        console.log("Employee")
        break;
      case "Update Employee Role":
        console.log("Role")
        break;
    }
  });
// });


