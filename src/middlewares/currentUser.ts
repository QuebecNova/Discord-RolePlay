import { NextFunction, Request, Response } from 'express'
import { User, UserDoc } from '../models/user'
import { InteractionType } from 'discord-interactions'

type UserPayload = {
	doc?: UserDoc
	discord_id: string //the user's  discord id
	username: string //  the user's username, not unique across the platform
	discriminator: string //	the user's Discord-tag
	global_name: string //the user's display name, if it is set. For bots, this is the application name
	avatar: string // the user's avatar hash
	bot?: boolean //	whether the user belongs to an OAuth2 application
	system?: boolean // whether the user is an Official Discord System user (part of the urgent message system)
	mfa_enabled?: boolean //	whether the user has two factor enabled on their account
	banner?: string // the user's banner hash identify
	accent_color?: number //the user's banner color encoded as an integer representation of hexadecimal color code
	locale?: string //the user's chosen language option
	verified?: boolean // whether the email on this account has been verified
	email?: string //the user's emai
	flags?: number // the flags on a user's account
	premium_type?: number //	the type of Nitro subscription on a user's account
	public_flags?: number //	the public flags on a user's account
	avatar_decoration?: string // the user's avatar decoration hash
}

declare global {
	namespace Express {
		interface Request {
			user: UserPayload
		}
	}
}

export const currentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.type === InteractionType.PING) return next()
	req.user = req.body.member.user
	req.user.discord_id = req.body.member.user.id

	const user = (await User.findOne({
		discord_id: req.user.discord_id,
	})) as UserDoc | undefined

	req.user.doc = user

	next()
}
