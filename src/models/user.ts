import mongoose from 'mongoose'
import { CharDoc } from './char'
import { Message, decodeMessage } from '../helpers/sendMessage'

interface UserAttrs {
	discord_id: string
	discord_username: string
	chars?: CharDoc[]
	char_limit: number
	money?: number
}

interface UserModel extends mongoose.Model<UserDoc> {
	build: (attrs: UserAttrs) => Promise<UserDoc>
}

export interface UserDoc extends mongoose.Document {
	discord_id: string
	discord_username: string
	chars: CharDoc[]
	char_limit: number
	money: number
	messages: string[]
	getMessageByCommand: (command: string) => Message | undefined
	deleteMessageByCommand: (command: string, save?: boolean) => Promise<string>
}

const userSchema = new mongoose.Schema(
	{
		discord_id: {
			type: String,
			trim: true,
			required: [true, 'User must have a discord id'],
			unique: true,
		},
		discord_username: {
			type: String,
			trim: true,
			required: [true, 'User must have a discord username'],
		},
		chars: [{ type: mongoose.Schema.ObjectId, ref: 'Char' }],
		char_limit: {
			type: Number,
			required: [true, 'User must have a char limit'],
		},
		money: {
			type: Number,
			default: 0,
		},
		messages: [{ type: String }],
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.__v
			},
			virtuals: true,
		},
		toObject: { virtuals: true },
	}
)

userSchema.pre(/^find/, function (next) {
	//@ts-ignore
	this.populate({
		path: 'chars',
	})

	next()
})

userSchema.statics.build = async (attrs: UserAttrs) => {
	return await new User(attrs).save()
}

userSchema.methods.getMessageByCommand = function (command: string) {
	const message = this.messages.find(
		(msg: string) => decodeMessage(msg).command === command
	)
	return message ? decodeMessage(message) : undefined
}
userSchema.methods.deleteMessageByCommand = async function (
	command: string,
	save: boolean = true
) {
	const index = this.messages.findIndex(
		(msg: string) => decodeMessage(msg).command === command
	)
	const deletedMsg = this.messages.splice(index, 1)
	if (save) await this.save()
	return deletedMsg
}

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema)
