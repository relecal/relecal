import * as Koa from "koa"
import * as Router from "koa-router"
import * as rawBody from "raw-body"
import { ValidateError } from "./validate";
import { ApiNormalError, ApiValidateError, isApiError } from "./errors";

const router = new Router

export default router

export var methods: {[key: string]: (params: any) => Promise<any>} = {}

export async function middleware(ctx: Koa.Context) {
    try {
        var json
        try {
            const raw = (await rawBody(ctx.req)).toString("utf-8")
            json = JSON.parse(raw)
        } catch(e) {
            throw new ApiNormalError("failed-parse-body", 400)
        }
    
        if (!json.method) {
            throw new ApiValidateError("required", "@method")
        }
    
        const callback = methods[json.method]
        
        if (!callback) {
            throw new ApiNormalError("method-not-found", 404)
        }
    
        await callback(json.params).then(res => {
            ctx.body = {
                ok: true,
                result: res
            }
        })
    } catch (e) {
        if (typeof e == "string") {
            e = new ApiNormalError(e)
        }
        if (!isApiError(e)) {
            e = new ApiNormalError("server-side-error", 503)
            console.error(e)
        }
        ctx.status = e.httpCode
        ctx.body = {
            ok: false,
            result: e.getErrorObject()
        }
    }
}

export function service(serviceName: string, callback: (router: (name: string, callback: (params: any) => Promise<any>) => void) => void) {
    callback((name, callback) => {
        methods[serviceName+"."+name] = callback
    })
}
