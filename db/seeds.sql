INSERT INTO department (id, name)
VALUES (1, "Production"),
    (2, "Research and Development"),
    (3, "Purchasing"),
    (4, "Marketing"),
    (5, "Human Resource"),
    (6, "Accounting and Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 160000, 1),
    ("Technician", 80000, 2),
    ("Consultant", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Walt", "Disney", 1, 1),
    ("Mickey", "Mouse", 2, 1),
    ("Minnie", "Mouse", 3, 1),
    ("Donald", "Duck", 2, 1);