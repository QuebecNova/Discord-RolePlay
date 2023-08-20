import { Request, Response } from 'express'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { createShopSelect } from '../components/shopSelect'
import { sendMessage } from '../helpers/sendMessage'

export const showShop = async (req: Request, res: Response) => {
	const user = req.user.doc
	if (!user || !user?.chars?.length)
		throw new BadRequestError("You don't have any characters!")

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: createShopSelect(user.money),
	})
}
