import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Exchange from '@/components/Other/Exchange'
import Hash from '@/components/Other/Hash'
import Pouch from '@/components/Other/Pouch'
import Mining from '@/components/Clients/Mining'
import Trans from '@/components/Clients/Trans'
import Report from '@/components/Clients/Report'
import Сontracts from '@/components/Clients/Contracts'
import Login from '@/components/User/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/hash',
      name: 'Hash',
      component: Hash,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mining',
      name: 'Mining',
      component: Mining,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trans',
      name: 'Trans',
      component: Trans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: Сontracts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pouch',
      name: 'Pouch',
      component: Pouch,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
//  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
