import { MigrationInterface, QueryRunner } from 'typeorm'

export class initDb1621326798232 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
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
       
       CREATE TABLE ORDERS_DISHES (id serial primary key,
           dish_id integer references DISHES(id),
           order_id integer references ORDERS(id));
       
       
       INSERT INTO ROLES(name) VALUES('ADMIN');
       INSERT INTO ROLES(name) VALUES('COOK');
       INSERT INTO USERS("first_name", "last_name", "email", "password", "role_id") VALUES ('Admin', 'Adminov', 'admin@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$0QoSOwVmJr5d9KrhhCPOzQ$AYrei/Y4WPSSk3MEZCocrW0hZdWQIsNKCvX6+/tHLlQ','1');
        `)
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE ORDERS_DISHES;

        DROP TABLE DISHES;
        
        DROP TABLE ORDERS;
        
        DROP TABLE USERS;
        
        DROP TABLE ROLES;
        `)
    }
}
// npm run typeorm migration:revert   - revert migration
// npm run typeorm migration:run   - run migration
