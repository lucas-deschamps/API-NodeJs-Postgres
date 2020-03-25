CREATE TABLE monsters(
    id serial,
    name varchar(50),
    personality varchar(50) 
);

CREATE TABLE habitats(
    id serial,
    name varchar(50),
    climate varchar(50),
    temperature int 
);

CREATE TABLE lives(
    monster varchar(50),
    habitat varchar(50) 
);

INSERT INTO monsters(name, personality)
VALUES 
('Fluffy', 'aggressive'),
('Noodles', 'impatient'),
('Rusty', 'passionate');

INSERT INTO habitats(name, climate, temperature)
VALUES
('desert', 'dry', 100),
('forest', 'haunted', 70),
('mountain', 'icy', 30);

INSERT INTO lives(monster, habitat)
VALUES
('Fluffy', 'desert'),
('Noodles', 'forest'),
('Rusty', 'mountain');