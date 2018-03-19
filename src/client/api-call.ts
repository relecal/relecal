import { ApiCallFailedHttp, ApiCallFailedText } from "./errors";
import { ApiErrorObject } from "../shared/api-error-interface";

export default async function apiCall<T>(method: string, params: {[key: string]: any}): Promise<T> {
    const res = await fetch("/api?"+method, {
        body: JSON.stringify({
            method,
            params,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })

    interface ApiResError {
        ok: false
        result: ApiErrorObject
    }

    interface ApiResSuccess {
        ok: true
        result: T
    }

    type ApiRes = ApiResSuccess | ApiResError

    const jsonRes: ApiRes = await res.json().catch(e => {
        throw new ApiCallFailedHttp(res.status, res.statusText)
    })
    
    if (jsonRes.ok == false) {
        throw new ApiCallFailedText(jsonRes.result.code)
    }
    return jsonRes.result
}