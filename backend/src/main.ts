import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getConnectionManager } from 'typeorm'
import { getManager } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs: any = require('fs')

async function bootstrap() {
    const dataSql = fs.readFileSync('./database/base.sql').toString()
    try {
        const connectionManager = getConnectionManager()
        const connection = connectionManager.create({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '0027',
            database: 'foodDB',
        })
        await connection.connect() // performs connection

        const entityManager = getManager()
        const someQuery = entityManager.query(dataSql)

        const app = await NestFactory.create(AppModule)
        await app.listen(3000)
    } catch (e) {
        console.log(e)
    }
}

bootstrap()
