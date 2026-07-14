import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { AppDataSource } from './data-source'
import { env } from './config/env'
import { authRoutes } from './routes/auth.routes'
import { requestRoutes } from './routes/request.routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.resolve(env.uploadDir)))

app.get('/health', (_req, res) => res.json({ status: 'ok', app: 'InformaTech Lite API' }))
app.use('/auth', authRoutes)
app.use('/requests', requestRoutes)

AppDataSource.initialize()
  .then(() => app.listen(env.port, () => console.log(`API rodando em http://localhost:${env.port}`)))
  .catch(error => console.error('Erro ao iniciar API:', error))
