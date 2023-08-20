import { discordRequest } from './discordRequest'

export type Command = {
	name: string
	description: string
	options: {
		type: number
		name: string
		description: string
		required: boolean
	}[]
	type: number
}

export async function installGlobalCommands(commands: Command[]) {
	// API endpoint to overwrite global commands
	const endpoint = `applications/${process.env.APP_ID!}/commands`

	try {
		// This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
		return await discordRequest(endpoint, { method: 'PUT', body: commands })
	} catch (err) {
		console.error(err)
	}
}
