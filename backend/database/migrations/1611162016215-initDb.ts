import { MigrationInterface, QueryRunner } from 'typeorm'

export class initDb1611162016215 implements MigrationInterface {
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
       
       CREATE TABLE DISHES_OREDERS (id serial primary key,
           dish_id integer references DISHES(id),
           order_id integer references ORDERS(id));
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE DISHES_OREDERS;

        DROP TABLE DISHES;

        DROP TABLE ORDERS;

        DROP TABLE USERS;

        DROP TABLE ROLES;
        `)
    }
}
// npm run typeorm migration:revert   - revert migration
// npm run typeorm migration:run   - run migration
