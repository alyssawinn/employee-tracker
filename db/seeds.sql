INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Human Resources'),
    ('Legal'),
    ('Marketing'),
    ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Developer', 90000, 1),
    ('Engineering Team Lead', 150000, 1),
    ('Accountant', 110000, 2),
    ('HR Admin Assistant', 40000, 3),
    ('Director of HR', 80000, 3),
    ('Legal Admin Assistant', 65000, 4),
    ('Attorney', 120000, 4),
    ('Marketing Coordinator', 60000, 5),
    ('Marketing Specialist', 50000, 5),
    ('SVP of Operations', 120000, 6),
    ('Operations Team Lead', 70000, 6),
    ('Operations Analyst', 55000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Marcus', 'Penn', 1, 3),
    ('Kourtney', 'Quinn', 1, 3),
    ('Rachael', 'Boyle', 2, null),
    ('Marlie', 'Davison', 3, null),
    ('Chloe', 'Bowers', 4, 6),
    ('Clint', 'Welsh', 5, null),
    ('Stuart', 'Huffman', 6, 8),
    ('Vlad', 'Santana', 7, null),
    ('Lilly', 'Fitzpatrick', 8, null),
    ('Justin', 'Flora', 9, 9),
    ('Paul', 'Garner', 10, null),
    ('Renee', 'Alston', 11, 11),
    ('Philip', 'Logan', 12, 12),
    ('Shannon', 'Ford', 12, 12),
    ('Kamron', 'Matthews', 12, 12);


    