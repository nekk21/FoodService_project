CREATE TABLE ROLES(id serial primary key,
     name varchar (255) UNIQUE);

CREATE TABLE USERS(id serial primary key,
    first_name varchar (255) NOT NULL,
    last_name  varchar(255) NOT NULL,
    email varchar (255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role_id integer references ROLES(id) DEFAULT(NULL));


CREATE TABLE ORDERS(id serial primary key,
    delivery_time date NOT NULL,
    customer_id integer references USERS(id));

CREATE TABLE DISHES(id serial primary key,
    name varchar(255),
    description text,
    price float,
    cook_id integer references USERS(id));

CREATE TABLE DISHES_OREDERS (id serial primary key,
    dish_id integer references DISHES(id),
    order_id integer references ORDERS(id));

INSERT INTO USERS(first_name, last_name, email, password) VALUES ('Admin', 'Adminov', 'admin@gmail.com', 'admin');
INSERT INTO ROLES(name) VALUES('ADMIN');
INSERT INTO ROLES(name) VALUES('COOK');

DROP TABLE DISHES_OREDERS;

DROP TABLE DISHES;

DROP TABLE ORDERS;

DROP TABLE USERS;

DROP TABLE ROLES;