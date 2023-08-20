import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/CustomError'
import {
	InteractionResponseFlags,
	InteractionResponseType,
} from 'discord-interactions'
import { sendMessage } from '../helpers/sendMessage'

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return sendMessage(req, res, {
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: err.serializeErrors(),
			},
		})
	}
	console.error(err)

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: 'Error: ' + err.message,
		},
	})
}
