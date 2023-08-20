import { discordRequest } from './discordRequest'

export async function deleteBotMessage(messageToken: string) {
	// API endpoint to overwrite global commands
	const endpoint = `webhooks/${process.env
		.APP_ID!}/${messageToken}/messages/@original`
	try {
		// This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
		return await discordRequest(endpoint, { method: 'DELETE' })
	} catch (err) {
		console.error(err)
	}
}
