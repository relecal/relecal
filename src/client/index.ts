import Vue from "vue"
import VueRouter from "vue-router"

import App from "./app.vue"
import PageIndex from "./components/pages/index.vue"
import PageLogin from "./components/pages/login.vue"

import "./bootstrap_custom.scss"

Vue.use(VueRouter)

const routes = [
    { path: "/", component: PageIndex },
    { path: "/login", component: PageLogin },
]

const router = new VueRouter({
    mode: 'history',
    routes,
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
