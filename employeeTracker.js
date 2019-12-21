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

//Function that returns all of the data from the role table
getRoleResponse = function () {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;

      // return res;
      resolve(res);
    });
  });
};


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

    console.table(res);

    runProgram();
  });
}


function viewByRole(role) {
  connection.query("SELECT * FROM employee WHERE title = ?", [role], function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    runProgram();
  });
}

function viewByDepartment(department) {
  connection.query("SELECT * FROM employee WHERE department = ?", [department], function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    runProgram();
  });
}

function inquireDepartment() {
  // let departmentName = [];
  // connection.query("SELECT name FROM department", function (err, res) {
  //   if (err) throw err;

  //   departmentName = res;

  //   // res.forEach(element => {
  //   //   departmentName.push(element.title);
  //   // });
  // });

  inquirer
    .prompt({
      name: "departmentName",
      type: "list",
      message: "Which department would you like to view?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
        "Exit."
      ]
      // choices: [departmentName]
    })
    .then(function (answer) {
      switch (answer.departmentName) {
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
        "Software Engineer",
        "Junior Software Engineer",
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
        case "Software Engineer":
          let softwareEngineer = "Software Engineer";
          viewByRole(softwareEngineer);
          break;
        case "Junior Software Engineer":
          let juniorSoftwareEngineer = "Junior Software Engineer";
          viewByRole(juniorSoftwareEngineer);
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

  // let managerNames = [];
  // connection.query("SELECT * FROM manager", function (err, res) {
  //   if (err) throw err;

  //   managersNames = res;
  //   res.forEach(element => {
  //     managerNames.push(element.first_name + " " + element.last_name);
  //   });
  // });

  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is their first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?"
      },
      {
        name: "department",
        type: "list",
        message: "What is their department?",
        choices: ["Sales", "Engineering", "Finance", "Legal"]
      },
      {
        name: "title",
        type: "list",
        message: "What is their title?",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Legal Assistant"]
      },
      {
        name: "salary",
        type: "input",
        message: "What is their salary?"
      },
      {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
        choices: ["No manager.", "Null"]
      }
    ])
    .then(function (answer) {

      let newEmployee = {
        first_name: answer.firstName,
        last_name: answer.lastName,
        department: answer.department,
        title: answer.title,
        salary: answer.salary,
        manager: answer.manager
      }
      // when finished prompting, insert a new item into the db with that info
      connection.query("INSERT INTO employee SET ?", newEmployee, function (err) {
        if (err) throw err;

        viewEmployees();
        runProgram();
      }
      );
    });
}

function removeEmployee() {
  connection.query("SELECT * FROM employee", function (req, res) {
    // if (err) throw err;

    const employeeNames = res.map(employee => {
      return employee.first_name +" " + employee.last_name
    });
    console.log(employeeNames)

    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeNames //employeeListArray here <-------------------------------------
          //choices array documentation

        }
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        console.log("inside .then", answer.employeeName);
        const fullName = answer.employeeName.split(" ")
        connection.query(
          "DELETE FROM employee WHERE ? AND ?", [{ first_name: fullName[0]}, {last_name: fullName[1] }], function (err) {
            if (err) console.log(err);
          }
        );
        runProgram();
      });
  })
}


function updateRole() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "list",
        message: "Which employee would you like to update?",
        choices: [
          "Matt",
          "Exit."
        ],
      },
      {
        name: "role",
        type: "list",
        message: "What is their new role?",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Legal Assistant"]
      }
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET title = ? WHERE first_name = ?", [answer.role, answer.first_name],
        function (err, res) {
          if (err) throw err;
        }
      );
      runProgram();
    });
};

