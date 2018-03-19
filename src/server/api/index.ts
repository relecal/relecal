import * as Router from "koa-router"
import { middleware, service } from "./router";

const router = new Router

router.get("/", async ctx => {
    ctx.body = {
        "status": "ok"
    }
})

router.post("/", middleware)

service("Login", (r) => {
    r("GetUrl", async (params: string) => {
        // WIP
        return "https://imastodon.net/oauth/authorize"
    })
})

export default router