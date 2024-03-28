import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import RecordContentView from '../views/record/RecordContentView'
import RecordIndexView from '../views/record/RecordIndexView'
import RanklistIndexView from '../views/ranklist/RanklistIndexView'
import UserBotsIndexView from '../views/user/Bots/UserBotsIndexView'
import NotFound from '../views/error/NotFound'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'
import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    //这个随便定义的
    //flag: true,
    meta: { //额外信息放到一个meta域里面
      requestAuth: true, //是否需要授权
    }
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true,
    }
  },

  {
    path: "/record/:recordId/",
    name: "record_content",
    component: RecordContentView,
    meta: {
      requestAuth: true,
    }
  },

  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/Bots/",
    name: "user_Bots_index",
    component: UserBotsIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => { //每次执行到router起作用前 执行的一个函数 next:将页面要不要执行下一步操作,跳转到哪个页面，从哪个页面跳转过去的
  if (to.meta.requestAuth && !store.state.user.is_login) { //如果要去的页面是需要授权的并且没登录
    next({name: "user_account_login"}); 
  } else {
    next(); // 否则跳转到默认页面
  }
})

export default router
