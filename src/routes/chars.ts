import { NextFunction, Request, Response } from 'express'
import { createChar } from '../controllers/createChar'
import { getChar } from '../controllers/getChar'
import { availableCommands } from '../commands'
import { deleteChar } from '../controllers/deleteChar'
import { getAllChars } from '../controllers/getAllChars'

export const createCharRoutes = async (
	req: Request,
	res: Response,
	command: string
) => {
	if (command === availableCommands.addChar) {
		await createChar(req, res)
	}

	if (command === availableCommands.showChar) {
		await getChar(req, res)
	}

	if (command === availableCommands.deleteChar) {
		await deleteChar(req, res)
	}

	if (command === availableCommands.showAllChars) {
		await getAllChars(req, res)
	}
}
