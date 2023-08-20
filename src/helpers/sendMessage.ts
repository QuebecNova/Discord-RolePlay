import { Request, Response } from 'express'
import { deleteBotMessage } from './deleteBotMessage'
import { InteractionResponseFlags, InteractionType } from 'discord-interactions'
import { MAX_MESSAGES } from '../settings'

export type Message = {
	command: string
	token: string
}

export const sendMessage = async (
	req: Request,
	res: Response,
	data: any,
	settings: {
		notEphemeral?: boolean
	} = {}
) => {
	if (!process.env.NOT_EPHEMERAL_MESSAGES && !settings.notEphemeral) {
		data.data.flags = InteractionResponseFlags.EPHEMERAL
	}
	if (req.body.type !== InteractionType.PING && req.user?.doc) {
		const command = req.body.data.name || req.body.data.custom_id
		const token = req.body.token

		const userDoc = req.user.doc

		const prevMessage = userDoc.getMessageByCommand(command)

		if (prevMessage) {
			await deleteBotMessage(prevMessage.token)
			await userDoc.deleteMessageByCommand(command)
		}

		if (userDoc.messages.length >= MAX_MESSAGES) {
			const { command, token } = decodeMessage(userDoc.messages[0]!)
			await deleteBotMessage(token)
			await userDoc.deleteMessageByCommand(command)
		}

		userDoc.messages.push(encodeMessage(command, token))
		await userDoc.save()
	}
	res.send(data)
}

export const encodeMessage = (command: string, token: string) => {
	return `${command}.${token}`
}

export const decodeMessage = (message: string) => {
	const [command, token] = message.split('.')
	return {
		command,
		token,
	}
}
