import { Request, Response } from 'express'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { sendMessage } from '../helpers/sendMessage'
import { getAllCharsInfo } from '../components/charInfo'

export const info = async (req: Request, res: Response) => {
	const user = req.user.doc
	if (!user || !user?.chars?.length)
		throw new BadRequestError(
			'Create your character beforehand! Try /add-character'
		)

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `Gems: ${user.money}

Chars: 
${getAllCharsInfo(user.chars)}

Slots: ${user.chars.length}/${user.char_limit}
`,
		},
	})
}
