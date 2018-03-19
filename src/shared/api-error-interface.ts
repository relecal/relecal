export interface ApiNormalErrorObject {
    type: "normal"
    code: string
}

export interface ApiValidateErrorObject {
    type: "validate"
    code: string
    name: string
}

export type ApiErrorObject = ApiNormalErrorObject | ApiValidateErrorObject