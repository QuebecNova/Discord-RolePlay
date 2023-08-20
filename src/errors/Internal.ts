import { CustomError } from './CustomError'

export class InternalError extends CustomError {
	statusCode = 500

	constructor(public message: string) {
		super(message)

		Object.setPrototypeOf(this, InternalError.prototype)
	}

	serializeErrors() {
		return 'Error: ' + this.message
	}
}
