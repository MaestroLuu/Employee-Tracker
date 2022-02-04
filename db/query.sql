SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id
FROM employee
JOIN role on employee.