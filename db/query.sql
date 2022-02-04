SELECT e.id, e.first_name, e.last_name, r.title, r.salary, CONCAT(e.first_name,' ', e.last_name) AS manager 
FROM employee AS e WHERE manager_id = 1
JOIN role as r 
ON r.id = e.id;