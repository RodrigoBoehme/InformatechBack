import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './config/env'
import { User } from './entities/User'
import { RescueRequest } from './entities/RescueRequest'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: false,
  logging: false,
  entities: [User, RescueRequest]
})
