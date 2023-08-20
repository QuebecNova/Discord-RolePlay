import { Request, Response } from 'express'
import { User } from '../models/user'
import { Char } from '../models/char'
import {
	InteractionResponseFlags,
	InteractionResponseType,
} from 'discord-interactions'
import { BadRequestError } from '../errors/BadRequest'
import { editBotMessage } from '../helpers/editBotMessage'
import { getShopSelectContent } from '../components/shopSelect'
import { sendMessage } from '../helpers/sendMessage'
import { availableCommands } from '../commands'
import { SLOT_COST, SLOT_LIMIT } from '../settings'

export const buySlot = async (req: Request, res: Response) => {
	const user = req.user.doc
	if (!user || !user?.chars?.length)
		throw new BadRequestError("You don't have any characters!")

	if (user.money < SLOT_COST) {
		throw new BadRequestError(
			`You don't have ${SLOT_COST} gems to purchase a slot. You need ${
				SLOT_COST - user.money
			} gems more. Try /work to earn some!`
		)
	}

	if (user.char_limit > SLOT_LIMIT) {
		throw new BadRequestError(`You have maximum ${SLOT_LIMIT} slot limits.`)
	}

	user.money -= SLOT_COST
	user.char_limit += 1
	await user.save()

	const message = user.getMessageByCommand(availableCommands.shop)
	if (message) {
		await editBotMessage(message.token, {
			content: getShopSelectContent(user.money),
		})
	}

	sendMessage(req, res, {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: `You bought 1 additional slot! Now you have slots ${user.char_limit} available. Your balance: ${user.money} gems`,
		},
	})
}
