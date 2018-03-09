import Vue from "vue"
import VueRouter from "vue-router"

import App from "./app.vue"
import IndexPage from "./components/index.vue"

import "./bootstrap_custom.scss"

Vue.use(VueRouter)

const routes = [
    { path: "/", component: IndexPage },
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    render(h) {
        return h(App)
    }
})

addEventListener("load", () => {
    app.$mount("#app")
})
