// HTTPのエラーが返ってきた場合
export class ApiCallFailedHttp extends Error {
    constructor(public status: number, public message: string) {
        super(`${status} ${message}`)
    }
}

// JSONでエラーが返ってきた場合
export class ApiCallFailedText extends Error {
    constructor(public message: string) {
        super(message)
    }
}
