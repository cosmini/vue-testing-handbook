import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes.js"
import { bustCache } from "@/bust-cache.js"
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({ routes, mode: 'history' })

export function beforeEach(to, from, next) {
  const isAuthenticated = store.getters['isAuthenticated']
  console.log(isAuthenticated)
  if (to.matched.some(record => record.meta.shouldBustCache)) {
    bustCache()
  }
  next()
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))


export default router
