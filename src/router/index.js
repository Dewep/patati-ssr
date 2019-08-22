import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../views/welcome.vue'
import User from '../views/user.vue'
import About from '../views/about.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',

    linkActiveClass: 'active',

    routes: [
      { name: 'welcome', path: '', component: Welcome },
      { name: 'user', path: '/user/:username', component: User },
      { name: 'about', path: '/about', component: About },
      { path: '*', redirect: '/' }
    ]
  })
}
