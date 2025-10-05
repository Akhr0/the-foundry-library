import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pino from 'pino'
import pinoHttp from 'pino-http'
import dotenv from 'dotenv'
import itemsRouter from './routes/items.js'
import spellsRouter from './routes/spells.js'
import fichesRouter from './routes/fiches.js'
import usersRouter from './routes/users.js'
import errorHandler from './utils/errorHandler.js'

dotenv.config()

const app = express()
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))
app.use(pinoHttp({ logger }))

app.get('/api/health', (_req, res) => res.json({ ok:true, ts: Date.now() }))

app.use('/api/items', itemsRouter)
app.use('/api/spells', spellsRouter)
app.use('/api/fiches', fichesRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

const port = process.env.PORT || 4000
app.listen(port, () => logger.info({ msg:`API listening on :${port}` }))
