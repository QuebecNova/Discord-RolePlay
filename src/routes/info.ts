import { Request, Response } from 'express'
import { availableCommands } from '../commands'
import { info } from '../controllers/info'

export const createInfoRoute = async (
	req: Request,
	res: Response,
	command: string
) => {
	if (command === availableCommands.info) {
		await info(req, res)
	}
}
