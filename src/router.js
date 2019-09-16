import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/home-page.vue'
import SignPage from './views/sign-page.vue'
import TaskPage from './views/task-page.vue'
import AddTaskPage from './views/add-task-page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign',
      component: SignPage
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: HomePage,
      props: true,
      beforeEnter(to, from, next){
        if(to.params.id == undefined){
            next({path: '/'});
        }
        return next();
      }
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: TaskPage,
      props: true,
      beforeEnter(to, from, next){
        if(to.params.id == undefined){
          next({path: '/tasks'});
        }
        return next();
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddTaskPage
    }
  ]
})
