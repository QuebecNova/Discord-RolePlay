import { InteractionResponseFlags } from 'discord-interactions'

export const createShopSelect = (money: number) => ({
	content: getShopSelectContent(money),
	components: [
		{
			type: 1,
			components: [
				{
					type: 3,
					custom_id: 'shop_select',
					options: [
						{
							label: 'Slot',
							value: 'slot',
							description:
								'1 additional slot for your character. 50 gems',
						},
					],
					placeholder: 'Buy an item',
				},
			],
		},
	],
})

export const getShopSelectContent = (money: number) => {
	return `Welcome to the shop! You have ${money} gems available.`
}
