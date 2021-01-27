 CREATE TABLE ROLES(id serial primary key,
            "name" varchar (255) UNIQUE);
       
       CREATE TABLE USERS(id serial primary key,
           "firstName" varchar (255) NOT NULL,
           "lastName"  varchar(255) NOT NULL,
           "email" varchar (255) UNIQUE NOT NULL,
           "password" varchar(255) NOT NULL,
           "roleId" integer references ROLES(id) DEFAULT(NULL));
       
       
       CREATE TABLE ORDERS(id serial primary key,
           "deliveryTime" date NOT NULL,
           "customerId" integer references USERS(id));
       
       CREATE TABLE DISHES(id serial primary key,
           "name" varchar(255),
           "description" text,
           "price" float,
           "cookId" integer references USERS(id));
       
       CREATE TABLE ORDERS_DISHES (id serial primary key,
           "dishId" integer references DISHES(id),
           "orderId" integer references ORDERS(id));
       
       
       INSERT INTO ROLES("name") VALUES('ADMIN');
       INSERT INTO ROLES("name") VALUES('COOK');
       INSERT INTO USERS("firstName", "lastName", "email", "password", "roleId") VALUES ('Admin', 'Adminov', 'admin@gmail.com', 'admin','1');

        DROP TABLE ORDERS_DISHES;

        DROP TABLE DISHES;
        
        DROP TABLE ORDERS;
        
        DROP TABLE USERS;
        
        DROP TABLE ROLES;