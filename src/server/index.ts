import * as Koa from "koa"
import * as Router from "koa-router"
import * as send from "koa-send"
import apiRouter from "./api"

const app = new Koa
const router = new Router

router.use("/api", apiRouter.routes())

router.get("*", async ctx => {
    await send(ctx, "/assets/index.html")
})

app.use(router.routes())

app.listen(process.env.PORT || 3000)