import path = require('path')
import { ConnectionOptions } from 'typeorm'

const config: any = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0027',
    database: 'foodDB',
    entities: [path.join(__dirname, '**', `*.entity.{ts,js}`)],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrations: [path.join(__dirname, '**', `*.migration.{ts,js}`)],
    cli: {
        migrationsDir: 'database/migrations',
    },
} as ConnectionOptions

export default config
