import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
// import {parsePath} from "vue-router/src/util/path";
import Home from "@/components/Home"
import Welcome from "@/components/welcome"
import Users from "@/components/ user/users"
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'Login'
    },
    {
        path: "/login",
        component: Login

    },
    {
        path: "/home",
        component: Home,
        redirect: '/welcome',
        children: [
            { path:'/welcome',component:Welcome},
            {path:'/users',component: Users}

        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//使用路由导航守卫进行登录验证
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next(); //判断to的值是不是等于login,就是判断是不是访问login页面
        //获取token,通过token判断是否要定位到login页面
    }
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
        return next('/login')
    } else {
        next()
    }
})

export default router
