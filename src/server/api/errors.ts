import { ApiNormalErrorObject, ApiValidateErrorObject } from "../../shared/api-error-interface";

export interface ApiError extends Error {
    httpCode: number

    getErrorObject(): {
        type: string
    }
}

export class ApiNormalError extends Error implements ApiError {
    constructor(public code: string, public httpCode: number = 500) {
        super(code)
    }

    getErrorObject() {
        return {
            type: "normal",
            code: this.code,
        } as ApiNormalErrorObject
    }
}

export class ApiValidateError extends Error implements ApiError {
    httpCode = 400

    constructor(public code: string, public name: string) {
        super(`${code} in ${name}`)
    }

    getErrorObject() {
        return {
            type: "validate",
            code: this.code,
            name: this.name,
        } as ApiValidateErrorObject
    }
}

export function isApiError(err: Error): err is ApiError {
    if (!('httpCode' in err)) return false
    if (!('getErrorObject' in err)) return false
    return true
}