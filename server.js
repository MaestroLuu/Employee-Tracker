// import packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "MySQL1124!",
  database: "classlist_db",
});

// get students from db
db.query("SELECT * FROM students", function (err, results) {
  // create an array of inquirer choice objects from the students
  const choices = results.map((student) => ({
    name: `${student.first_name} ${student.last_name}`,
    value: student,
  }));
  // prompt user
  inquirer
    .prompt([
      {
        type: "list",
        name: "student",
        message: "Select a student",
        choices,
      },
    ])
    .then((answers) => {
      // print user choice
      console.log(answers.student);
    });
});


