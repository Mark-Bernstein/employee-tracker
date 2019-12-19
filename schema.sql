DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
--------------------------------

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id VARCHAR (30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id VARCHAR (30) NULL,
  manager_id VARCHAR (30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  PRIMARY KEY (id)
);
--------------------------------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Bernstein", "Software Engineer", "Krystal Lin");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Burns", "Junior Software Engineer", "Mark Bernstein");
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
VALUES ("Sales Lead", 100000, "Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, "Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engingeer", 150000, "Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, "Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, "Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, "Legal");

INSERT INTO manager (first_name, last_name)
VALUES ("Bill", "Brown");

INSERT INTO manager (first_name, last_name)
VALUES ("Jessica", "Jackson");

----------------------------------
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM manager;