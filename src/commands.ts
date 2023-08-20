import 'dotenv/config'
import { Command, installGlobalCommands } from './helpers/installGlobalCommands'

export const availableCommands = {
	deleteChar: 'delete-character',
	showChar: 'show-character',
	addChar: 'add-character',
	work: 'work',
	shop: 'shop',
	info: 'info',
	showAllChars: 'show-all-characters',
}

const Info = {
	name: availableCommands.info,
	description: 'Shows info (chars, slots and gems) about you',
	options: [],
	type: 1,
}

const ShowAllChars = {
	name: availableCommands.showAllChars,
	description:
		'Shows all characters of specified @user (Pass nothing to see only yours)',
	options: [
		{
			type: 3,
			name: 'user',
			description: 'Pass @user',
			required: false,
		},
	],
	type: 1,
}

const DeleteCharacter = {
	name: availableCommands.deleteChar,
	description: 'Delete existing character',
	options: [
		{
			type: 3,
			name: 'character_name',
			description: 'Pass name of your character to delete...',
			required: true,
		},
	],
	type: 1,
}

const AddCharacter = {
	name: availableCommands.addChar,
	description: 'Add character',
	options: [
		{
			type: 3,
			name: 'name',
			description: 'Pass name of your character!',
			required: true,
		},
		{
			type: 3,
			name: 'questionnaire',
			description: 'Type here your character biography',
			required: true,
		},
	],
	type: 1,
}

const ShowCharacter = {
	name: availableCommands.showChar,
	description:
		'Show existing character by given name (Pass nothing to see last created character)',
	options: [
		{
			type: 3,
			name: 'character_name',
			description: 'Pass name of your character to show',
			required: false,
		},
	],
	type: 1,
}

const Work = {
	name: availableCommands.work,
	description: 'Work for a money, I suppose',
	options: [],
	type: 1,
}

const Shop = {
	name: availableCommands.shop,
	description: 'Show shop for see a good stuff to buy',
	options: [],
	type: 1,
}

const ALL_COMMANDS: Command[] = [
	DeleteCharacter,
	AddCharacter,
	ShowCharacter,
	ShowAllChars,
	Work,
	Shop,
	Info,
]

;(async function () {
	const res = await installGlobalCommands(ALL_COMMANDS)
	console.log(res?.statusText)
})()
