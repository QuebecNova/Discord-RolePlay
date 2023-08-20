import { Request, Response } from 'express'
import { availableCommands } from '../commands'
import { work } from '../controllers/work'

export const createWorkRoutes = async (
	req: Request,
	res: Response,
	command: string
) => {
	if (command === availableCommands.work) {
		await work(req, res)
	}
}
