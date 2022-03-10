import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {

//     return routerPush.call(this, location).catch(error=> error)

// }


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: "/home",
        name: 'Home',
        component: Home
    }
]

const router = new VueRouter({
    routes
})

export default router
