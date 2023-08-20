import { Request, Response } from 'express'
import { createCharRoutes } from './chars'
import { createShopRoutes } from './shop'
import { createWorkRoutes } from './work'
import { createInfoRoute } from './info'

export const createCommandRoutes = async (
	req: Request,
	res: Response,
	command: string
) => {
	await createCharRoutes(req, res, command)
	await createShopRoutes(req, res, command)
	await createWorkRoutes(req, res, command)
	await createInfoRoute(req, res, command)
}
