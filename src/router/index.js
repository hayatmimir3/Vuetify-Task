import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Add from '../views/Add.vue'
import List from '../views/List.vue'
import Update from '../views/Update.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // { 
  //   path: '/logout',
  //   name: 'Logout',
  //   component: Logout
  // },
  {
    path: '/:doctype/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/:doctype/list',
    name: 'List',
    component: List
  },
  {
    path: '/:doctype/update/:name',
    name: 'Update',
    component: Update
  },
]

const router = new VueRouter({
  routes
})

export default router
