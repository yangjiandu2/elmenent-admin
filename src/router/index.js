import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 *  配置滚动条的位置
 *  通过这个这个属性（是个函数），可以让应用像浏览器的原生表现那样，在按下 后退/前进 按钮时，简单地让页面滚动到顶部或原来的位置。
 */
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}
/**
 *  路由配置
 *  @mode: 配置路由模式（"hash" | "history" | "abstract"）
 *  @base: 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
 *  @linkActiveClass: 点击触发的class
 *  @scrollBehavior: 配置滚动条的位置
 */
// 常规路由 不参与权限配置
import layout from '@/components/layout/init'
const constRoute = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/login',
        component: resolve => require.ensure([], () => resolve(require('@/components/page/login')), 'login'),
        meta: { title: '登录' },
    }, {
        path: '*',
        component: resolve => require.ensure([], () => resolve(require('@/components/page/404')), 'error'),
        meta: { title: '404' },
    },
]
// 异步路由 后台权限配置
const asyncRoute = [
    {
        path: '/',
        component: layout,
        meta: { title: '异步请求页面' },
        children: [
            {
                path: '/home',
                icon: "el-icon-lx-home",
                name:'首页',
                component: resolve => require(['../views/home/index.vue'], resolve),
                meta: { title: '系统首页' }
            }, {
                path: '/target',
                icon: "el-icon-lx-cascades",
                name:'目标以及报表',
                component: resolve => require.ensure([], () => resolve(require('@/views/clue/index.vue')), 'error'),
                meta: { title: '目标以及报表' },
                children:[
                    {
                        path:'/statistics',
                        name:'目标统计',
                        icon: "el-icon-lx-cascades",
                        component: resolve => require.ensure([], () => resolve(require('@/views/clue/index.vue')), 'statistics'),
                        meta: { title: '目标统计' },
                        children:[{
                            path:'/task',
                            name:'任务列表',
                            component: resolve => require.ensure([], () => resolve(require('@/views/clue/index.vue')), 'statistics'),
                            meta: { title: '任务列表' },
                        }]
                    }
                ],
            }
            , {
                path: '/clue',
                icon: "el-icon-lx-cascades",
                name:'线索模块',
                component: resolve => require.ensure([], () => resolve(require('@/views/clue/index.vue')), 'error'),
                meta: { title: '线索模块' },
            }
            , {
                path: '/cardDragger',
                icon: "el-icon-lx-cascades",
                name:'组件',
                component: resolve => require.ensure([], () => resolve(require('../views/componentModule/cardDragger.vue')), 'error'),
                meta: { title: '组件' },
                children:[
                    {
                        path:'/cardDraggerList',
                        name:'卡片拖动',
                        icon: "el-icon-lx-cascades",
                        component: resolve => require.ensure([], () => resolve(require('../views/componentModule/cardDragger.vue')), 'statistics'),
                        meta: { title: '卡片拖动' },
                    }
                ],
            }
        ]
    },{
        path: '/403',
        component: layout,
        meta: { title: '异常页面' },
        children:[
            {
                path: '/403',
                name:'403',
                component: resolve => require.ensure([], () => resolve(require('@/components/page/403')), 'error'),
                meta: { title: '403' },
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    likActiveClass: 'link-active',
    scrollBehavior,
    routes: constRoute.concat(...asyncRoute),
    asyncRoute:asyncRoute[0].children,
})
/**
 *  修改网站title的值
 */
router.afterEach((transition) => {
    if (transition.meta.title) {
        document.title = transition.meta.title
    }
})
/**
 * 路由拦截器
 * 用钩子函数对路由进行权限跳转
 * 1.判断该路由是否需要登录权限
 * 2.通过vuex state获取当前的token是否存在
 * 3.将跳转的路由path作为参数，登录成功后跳转到该路由
 */
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})
/**
 * 路由输出
 */
export default router
