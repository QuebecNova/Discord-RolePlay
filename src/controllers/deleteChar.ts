import { Request, Response } from 'express'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { sendMessage } from '../helpers/sendMessage'

export const deleteChar = async (req: Request, res: Response) => {
	const { data } = req.body
	const name = data.options?.[0]?.value as string

	if (!name) throw new BadRequestError('Pass a name of a character!')

	if (!req.user.doc || !req.user.doc?.chars?.length)
		throw new BadRequestError("You don't have any characters!")

	const char = req.user.doc.chars.find(
		char =>
			char.name === name && char.user_discord_id === req.user.discord_id
	)

	if (!char) throw new BadRequestError('Character you specified not found')

	await char.deleteOne()

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `Your character ${char.name} was deleted`,
		},
	})
}
