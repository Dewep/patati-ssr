import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../views/welcome.vue'
import User from '../views/user.vue'
import About from '../views/about.vue'
import PageNotFound from '../views/page-not-found.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',

    linkActiveClass: 'active',

    routes: [
      { name: 'welcome', path: '', component: Welcome },
      { name: 'user', path: '/user/:username', component: User, props: true },
      { name: 'about', path: '/about', component: About },
      { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
      { path: '*', redirect: '/page-not-found' }
    ]
  })
}
