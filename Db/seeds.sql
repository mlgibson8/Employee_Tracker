-- prepopulate seeds
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Production')
       ('Finance'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Customer service', 60000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 4),
       ('Legal Team Lead', 250000, 5),
       ('Lawyer', 190000, 5);

INSERT INTO employee (first_name, last_name, title, role_id, department_id, salary, manager_id)
VALUES ('jimmothy','gilbert',2,1),
