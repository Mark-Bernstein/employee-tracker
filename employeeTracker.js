var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Maekownz22!", ////////////////////////////////////////////
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  runProgram();
});

function runProgram() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Role",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit."
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          viewEmployees();
          break;
        case "View all Employees by Department":
          inquireDepartment();
          break;
        case "View all Employees by Role":
          inquireRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        /* case "Update Employee Manager":
          updateManager();
          break; */
        case "Exit.":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    //   res.forEach(e => {
    //     console.log(e.name);
    //   });
    runProgram();
  });
}


function viewByRole(role) {
  connection.query("SELECT * FROM role WHERE title = ?", [role], function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    runProgram();
  });
}

function viewByDepartment(department) {
  console.log(department);
  connection.query("SELECT * FROM department WHERE name=?", [department], function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    runProgram();
  });
}

function inquireDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which role would you like to view?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
        "Exit."
      ]
    })
    .then(function (answer) {
      switch (answer.department) {
        case "Sales":
          let sales = "Sales";
          viewByDepartment(sales);
          break;
        case "Engineering":
          let engineering = "Engineering";
          viewByDepartment(engineering);
          break;
        case "Finance":
          let finance = "Finance";
          viewByDepartment(finance);
          break;
        case "Legal":
          let legal = "Legal";
          viewByDepartment(legal);
          break;
        case "Exit.":
          runProgram()
          break;
      }
    });
}

function inquireRole() {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Which role would you like to view?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engingeer",
        "Software Engineer",
        "Accountant",
        "Lawyer",
        "Exit."
      ]
    })
    .then(function (answer) {
      switch (answer.role) {
        case "Sales Lead":
          let salesLead = "Sales Lead";
          viewByRole(salesLead);
          break;
        case "Salesperson":
          let salesPerson = "Salesperson";
          viewByRole(salesPerson);
          break;
        case "Lead Engingeer":
          let leadEngineer = "Lead Engineer";
          viewByRole(leadEngineer);
          break;
        case "Software Engineer":
          let softwareEngineer = "Software Engineer";
          viewByRole(softwareEngineer);
          break;
        case "Accountant":
          let accountant = "Accountant";
          viewByRole(accountant);
          break;
        case "Lawyer":
          let lawyer = "Lawyer";
          viewByRole(lawyer);
          break;
        case "Exit.":
          runProgram()
          break;
      }
    });
}


function addEmployee() {

  runProgram();
}

function removeEmployee() {

  runProgram();
}


function updateRole() {

  runProgram();
}


/* What would you like to do? (initial prompt)
_________________________
View all Employees (shows the table)
View all Employees by Department (filters by department and shows table)
View all Employees by Role (filters by role and shows table)
Add Employee
  -What is the employee's first name?
  -What is the employee's last name?
  -What is the employee's role?
  -Who is the employee's manager?
  -What would you like to do? (starts over to initial prompt)
Remove Employee
Update Employee
Update Employee Role
Update Employee Manager (BONUS, not REQUIRED) */
