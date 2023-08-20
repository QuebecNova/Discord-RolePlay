import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { createCommandRoutes } from './commands'
import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../middlewares/errorHandler'
import { createBuyInShopRoutes } from './shop'

export const interactions = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { type } = req.body
		if (type === InteractionType.PING) {
			return res.send({ type: InteractionResponseType.PONG })
		}

		if (!req.body.data) next()
		const { data } = req.body

		if (type === InteractionType.APPLICATION_COMMAND) {
			const command = data.name
			await createCommandRoutes(req, res, command)
		}

		if (type === InteractionType.MESSAGE_COMPONENT) {
			const componentID = data.custom_id as string
			const value = data.values[0]
			await createBuyInShopRoutes(req, res, { id: componentID, value })
		}
	} catch (error) {
		errorHandler(error as Error, req, res, next)
	}
}
