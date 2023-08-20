import { discordRequest } from './discordRequest'

export async function editBotMessage(messageToken: string, body?: any) {
	// API endpoint to overwrite global commands
	const endpoint = `webhooks/${process.env
		.APP_ID!}/${messageToken}/messages/@original`

	try {
		// This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
		return await discordRequest(endpoint, { method: 'PATCH', body })
	} catch (err) {
		console.error(err)
	}
}
