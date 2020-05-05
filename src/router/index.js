import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login',
    component: resolve => require(['../components/Login.vue'], resolve)
  },
  { path: '/home', 
    component: resolve => require(['../components/Home.vue'], resolve) ,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: resolve => require(['../components/Welcome.vue'], resolve) },
      { path: '/users', component: resolve => require(['../components/user/users.vue'], resolve) }
    ] }
  
]

const router = new VueRouter({
  routes
})

//导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if(!token) return next('/login');
  next();
});

export default router
