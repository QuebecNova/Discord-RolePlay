import { Request, Response } from 'express'
import { User } from '../models/user'
import { Char } from '../models/char'
import { InteractionResponseType } from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { sendMessage } from '../helpers/sendMessage'
import { getCharInfo } from '../components/charInfo'

export const createChar = async (req: Request, res: Response) => {
	const { data } = req.body
	const discord_id = req.user.discord_id
	const discord_username = req.user.global_name

	const name = data.options[0].value as string
	const questionnaire = data.options[1].value as string

	let user = req.user.doc

	if (!user) {
		user = await User.build({ discord_id, discord_username, char_limit: 2 })
		req.user.doc = user
	}

	if (user.chars.length >= user.char_limit) {
		throw new BadRequestError(
			'You exceeded maximum amount (' +
				user.char_limit +
				') of characters'
		)
	}

	const char = await Char.build({
		name,
		questionnaire,
		user_discord_id: user.discord_id,
	})

	user.chars.push(char.id)
	await user.save({ validateBeforeSave: false })

	sendMessage(
		req,
		res,
		{
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: `
Successfuly created character!

${getCharInfo(char)}
`,
			},
		},
		{ notEphemeral: true }
	)
}
