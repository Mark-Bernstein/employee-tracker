DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
--------------------------------

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  title VARCHAR (30) NOT NULL,
  department VARCHAR (30) NOT NULL,
  salary DECIMAL,
  manager VARCHAR (30),
  PRIMARY KEY (id)
);
 
CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  PRIMARY KEY (id)
);
--------------------------------
INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Mark", "Bernstein", "Software Engineer", "Engineering", "120000", "Krystal Lin");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Bob", "Burns", "Junior Software Engineer", "Engineering", "70000", "Mark Bernstein");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Billy", "Newman", "Sales Lead", "Sales", "100000", "Null");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Rafael", "Frost", "Salesperson", "Sales", "80000", "Billy Newman");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Ben", "James", "Accountant", "Finance", "125000", "Null");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Joe", "Dirt", "Payroll",  "Finance", "80000", "Null");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Nancy", "Nguyen", "Legal Assistant", "Legal", "85000", "Jill Aims");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Jill", "Aims", "Lawyer", "Legal", "190000", "Null");
---------------------------------

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");
---------------------------------

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Software Engineer", 70000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Payroll", 80000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Assistant", 85000, 4);

------------------------------------

INSERT INTO manager (first_name, last_name)
VALUES ("Bill", "Brown");

INSERT INTO manager (first_name, last_name)
VALUES ("Jessica", "Jackson");


INSERT INTO manager (first_name, last_name)
VALUES ("Krystal", "Lin");

-------------------------------------
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM manager;