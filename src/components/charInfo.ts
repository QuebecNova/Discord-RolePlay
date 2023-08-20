import { CharDoc } from '../models/char'

export const getCharInfo = (char: CharDoc) =>
	`Name: ${char.name}
Questionnaire: ${char.questionnaire}`

export const getAllCharsInfo = (chars: CharDoc[]) =>
	chars
		.map(
			(char, index) =>
				`${getCharInfo(char)}${
					index + 1 !== chars.length
						? '\n---------------------------------------\n'
						: ''
				}`
		)
		.join('')
