import { Request, Response } from 'express'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { Char } from '../models/char'
import { sendMessage } from '../helpers/sendMessage'

export const getChar = async (req: Request, res: Response) => {
	const { data } = req.body
	const name = data.options?.[0]?.value as string | undefined
	console.log(name)
	if (!req.user.doc || !req.user.doc?.chars?.length)
		throw new BadRequestError("You don't have any characters!")

	let char
	if (!name) {
		char = req.user.doc.chars.at(-1)
	} else {
		char = await Char.findOne({ name })
	}

	if (!char) throw new BadRequestError('Character you specified not found')

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `
Character ${char.name}:
    Questionnaire: ${char.questionnaire}
      `,
		},
	})
}
