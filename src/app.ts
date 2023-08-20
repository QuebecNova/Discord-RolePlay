import 'dotenv/config'
import express from 'express'
import { verifyDiscordRequest } from './helpers/verifyDiscordRequest'
import { errorHandler } from './middlewares/errorHandler'
import morgan from 'morgan'
import { currentUser } from './middlewares/currentUser'
import { interactions } from './routes/interactions'
import 'express-async-errors'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'

export const app = express()

app.use(cors())

app.options(process.env.FRONTEND_CORS_DOMAIN!, cors())

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Try again in 1 hour',
});

app.use(limiter);

app.use(helmet())

app.use(xss())

app.use(
	hpp({
		whitelist: [],
	})
)

app.get('/gateway', (req, res) => {
	res.status(200).send({ status: 'OK' })
})

app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY!) }))

app.use(morgan('dev'))

app.use(currentUser)

app.post('/interactions', interactions)

app.use(errorHandler)
