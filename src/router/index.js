import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../pages/welcome.vue'
import Users from '../pages/users.vue'
import User from '../pages/user.vue'
import PageNotFound from '../pages/page-not-found.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',

    linkActiveClass: 'active',

    routes: [
      { name: 'welcome', path: '', component: Welcome },
      { name: 'users', path: '/users', component: Users },
      { name: 'user', path: '/user/:username', component: User, props: true },
      { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
      { path: '*', redirect: '/page-not-found' }
    ]
  })
}
