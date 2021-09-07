drop database if exists employees_db;
create database employees_db;
use employees_db

create table department(
    id int not null auto_increment,
    dept_name varchar(30) not null
    utilized_budget decimal,
    primary key (id)
);

create table roles (
    id int not null auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id) references department (id),
    primary key (id)
);

create table employee (
    id int not null auto_increment,
    first_name varchar(30) not null,
    nickname varchar(30),
    last_name varchar(30) not null,
    emp_dept varchar(30) not null,
    salary decimal not null,
    roles_id int not null,
    manager_id int,
    foreign key (manager_id) references employee (id),
    foreign key (roles_id) references roles (id),
    primary key (id)
);

create table manager (
    id int not null,
    manager_name varchar(30) not null 
);