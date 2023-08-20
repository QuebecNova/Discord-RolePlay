import { Request, Response } from 'express'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { Char, CharDoc } from '../models/char'
import { sendMessage } from '../helpers/sendMessage'
import { User, UserDoc } from '../models/user'
import { getAllCharsInfo } from '../components/charInfo'

export const getAllChars = async (req: Request, res: Response) => {
	const { data } = req.body
	let discord_id = data.options?.[0]?.value as string | undefined

	let chars: CharDoc[]
	let user: UserDoc
	if (!discord_id) {
		if (!req.user.doc || !req.user.doc?.chars?.length)
			throw new BadRequestError("You don't have any characters!")
		user = req.user.doc
		chars = req.user.doc.chars
	} else {
		discord_id = discord_id.slice(2).slice(0, -1)
		user = (await User.findOne({ discord_id })) as UserDoc

		if (!user?.chars?.length)
			throw new BadRequestError(
				"User you specified don't have any characters"
			)
		chars = user.chars
	}

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `Characters for user ${user.discord_username}:

${getAllCharsInfo(chars)}`,
		},
	})
}
