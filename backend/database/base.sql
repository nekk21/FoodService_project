-- CREATE TABLE ROLE(id serial primary key,
--      role_title varchar (255) UNIQUE DEFAULT('USER'));


-- CREATE TABLE USERR(id serial primary key,
--     name varchar (255) UNIQUE NOT NULL,
--     email varchar (255) UNIQUE NOT NULL,
--     password varchar(255) NOT NULL,
--     role_id integer references ROLE(id));


-- CREATE TABLE ORDERR(id serial primary key,
--     user_id integer references USERR(id),
--     delivery_time date DEFAULT(NULL));

-- CREATE TABLE DISH(id serial primary key,
--     title varchar(255),
--     description text,
--     price integer);

-- CREATE TABLE DISH_OREDERR(dish_id integer references DISH(id),
--     order_id integer references ORDERR(id));