import { Request, Response } from 'express'
import { availableCommands } from '../commands'
import { showShop } from '../controllers/showShop'
import { buySlot } from '../controllers/buySlot'

export const createShopRoutes = async (
	req: Request,
	res: Response,
	command: string
) => {
	if (command === availableCommands.shop) {
		await showShop(req, res)
	}
}

export const createBuyInShopRoutes = async (
	req: Request,
	res: Response,
	buyInfo: {
		id: string
		value: string
	}
) => {
	if (buyInfo?.id === 'shop_select') {
		if (buyInfo.value === 'slot') {
			await buySlot(req, res)
		}
	}
}
