import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/', 
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
    meta: {
      title: '个人'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登入'
    }
  },
  {
    path: '/register',
    component: () => import('../views/register/Reginster.vue'),
    meta: {
      title: '注册'
    },
    beforeEnter: (to : any, from: any) => {
      if(localStorage.getItem('token')) {
        return false
      }
    }
  },
  {
    path: '/password',
    component: () => import('../views/changepassword/ChangePassword.vue'),
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/detuser',
    component: () => import('../views/deleteuser/DeleteUser.vue'),
    meta: {
      title: '注销用户'
    }
  },
  {
    path: '/updata',
    component: () => import('../views/updatauser/UpdataUser.vue'),
    meta: {
      title: '更新信息'
    }
  },
  {
    path: '/nickname',
    component: () => import('../views/updatauser/childrencomps/updatanickname.vue'),
    meta: {
      title: '修改昵称'
    }
  },
  {
    path: '/email',
    component: () => import('../views/updatauser/childrencomps/updataemail.vue'),
    meta: {
      title: '修改邮箱'
    }
  },
  {
    path: '/persig',
    component: () => import('../views/updatauser/childrencomps/updatapersig.vue'),
    meta: {
      title: '个性签名'
    }
  },
  {
    path: '/comment',
    component: () => import('../views/comment/comment.vue'),
    meta: {
      title: '评论区'
    }
  },
  {
    path: '/forgetpwd',
    component: () => import('../views/forgetpwd/forgetPwd.vue'),
    meta: {
      title: '忘记密码'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),  
  routes,
})
const norouter = ['/persig', '/email', '/nickname', '/detuser','/password',]
router.beforeEach((to,from,next) => {
  document.title = to.meta.title as string
  if(localStorage.getItem('token')) {
    next()
  } else {
    if (norouter.indexOf(to.fullPath) === -1) {
      next()
    } else{
      next({
        path: '/login'
      })
    }
  }
  
})
export default router 