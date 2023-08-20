import { Request, Response } from 'express'
import {
	InteractionResponseFlags,
	InteractionResponseType,
} from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { editBotMessage } from '../helpers/editBotMessage'
import { getShopSelectContent } from '../components/shopSelect'
import { sendMessage } from '../helpers/sendMessage'
import { availableCommands } from '../commands'

export const work = async (req: Request, res: Response) => {
	if (!req.user.doc || !req.user.doc?.chars?.length)
		throw new BadRequestError(
			'Create your first character to be able to work'
		)

	const user = req.user.doc
	user.money += 1
	await user.save({ validateBeforeSave: false })

	const message = user.getMessageByCommand(availableCommands.shop)
	if (message) {
		await editBotMessage(message.token, {
			content: getShopSelectContent(user.money),
		})
	}

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `You mined 1 gem! Your balance: ${req.user.doc.money} gems`,
		},
	})
}
