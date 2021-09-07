const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "vegetable",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    runsearch()
});

function runsearch() {
    inquirer
        .prompt({
            name: "WWYLTD",
            type: "list",
            message: "what would you like to do?",
            choices: ["view all departments.", "view all employees.", "view all employees by department.", "view all employees by manager."]
        })
        .then(function(answer) {
            switch (answer.WWYLTD) {
                case "view all departments.":
                    viewdepartments();
                    break;

                case "view all employees.":
                    viewemployees();
                    break;

                case "view all employees by department.":
                    viewemployeesbydept();
                    break;

                case "view all employees by manager.":
                    viewemployeesbymgr();
                    break;

                case "add employee.":
                    addemployee();
                    break;

                case "remove employee.":
                    removeemployee();
                    break;

                case "update employee role.":
                    updateemployeerole();
                    break;

                case "update employee manager.":
                    updateemployeemgr();
                    break;

                case "end session.":
                    endsession();
                    break;

            }
        });
}

function viewdepartments() {
    connection.query("select id, dept_name, utilized_budget from department", function(err, res) {
        if (err) throw err;
        console.table('departments', res);
        runsearch()
    })
}

function viewemployees() {
    let query = "select employee.id, employee.first_name, employee.nickname, employee.last_name, department.dept_name, employee.emp_dept, derpartment.id, roles.department_id, employee.manager_id, manager.id, manager.mgr_id, manager.mgr_name";
    query += "from employee";
    query += "inner join department on employee.emp_dept = derpartment.dept_name";
    query += "inner join roles on department.id = roles.department_id";
    query += "inner join manager on empolyee.manager_id = manager.id";
    connection.query(query, function(err, res) {
        console.table('all employees', res);
        runsearch();
    })
}

function viewemployeesbydept() {
    let query = "select employee.id, employee.first_name, employee.nickname, employee.last_name, department.dept_name, employee.emp_dept, derpartment.id, roles.department_id, employee.manager_id, manager.id, manager.mgr_id, manager.mgr_name";
    query += "from department";
    query += "inner join employee on employee.emp_dept = department.dept_name";
    query += "order by department.dept_name";

    connection.query(query, function(err, res) {
        console.table('employees by manager', res);
        runsearch()
    })
}

function viewemployeesbymgr() {
    console.log("view employees by mgr.")
    let query = "select employee.id, employee.first_name, employee.nickname, employee.last_name, department.dept_name, employee.emp_dept, derpartment.id, roles.department_id, employee.manager_id, manager.id, manager.mgr_id, manager.mgr_name";
    query += "from manager";
    query += "inner join employee on manager.id = emloyee.manager_id";
    query += "order by manager.mgr_name";
    connection.query(query, function(err, res) {
        console.table('employees by manager', res);
        runsearch()
    })
}