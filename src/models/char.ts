import mongoose from 'mongoose'

interface CharAttrs {
	name: string
	questionnaire: string
	user_discord_id: string
}

interface CharModel extends mongoose.Model<CharDoc> {
	build: (attrs: CharAttrs) => Promise<CharDoc>
}

export interface CharDoc extends mongoose.Document {
	name: string
	questionnaire: string
	user_discord_id: string
}

const charSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Char must have a name'],
		},
		questionnaire: {
			type: String,
			required: [true, 'Char must have a questionnaire'],
			trim: true,
		},
		user_discord_id: {
			type: String,
			required: [true, 'Add User Discord Id which Char belongs to'],
		},
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
		toObject: {
			virtuals: true,
		},
	}
)

charSchema.statics.build = async (attrs: CharAttrs) => {
	return await new Char(attrs).save()
}

export const Char = mongoose.model<CharDoc, CharModel>('Char', charSchema)
