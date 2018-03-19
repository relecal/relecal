export class ValidateError extends Error {
    constructor(public name: string, public code: string) {
        super()
    }
}