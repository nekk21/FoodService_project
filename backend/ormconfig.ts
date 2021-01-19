import path = require('path')

export const config: any = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'foodDB',
    entities: [path.join(__dirname, '**', `*.entity.{ts,js}`)],
    synchronize: true,
}
