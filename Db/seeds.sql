INSERT INTO department(name)
VALUES ("Operations"), ("Marketing"), ("Sales"), ("Legal"), ("Tech");

-- Adding role seeds
INSERT INTO role(title, salary, department_id)
VALUES ("Operations Manager",120000, 1),
    ("Associate",75000, 1),
    ("Marketing Manager",125000, 2),
    ("Salesman",90000, 3),
    ("Lawyer",180000, 4),
    ("Developer",135000, 5),
    ("Intern",85000, 5),
    ("DevOps",120000, 5);

-- Adding employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jimbo", "Colliage", 1, null),
    ("Annette", "Ficco", 3, null),
    ("Mark", "Newton", 5, 2),
    ("Sierra", "Buffington", 2, 3),
    ("Amber", "Malone", 3, 3),
    ("Dan", "Humphry", 4, 3);

