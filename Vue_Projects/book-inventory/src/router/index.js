import Vue from 'vue'
import Router from 'vue-router'
import AllBooks from '../components/AllBooks.vue'
import NewBook from '../components/NewBook'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AllBooks',
      component: AllBooks
    },
    {
      path: '/newBook',
      name: 'NewBook',
      component: NewBook
    },
    {
      path: '/helloworld',
      name: 'helloWorld',
      component: HelloWorld
    }
  ]
})
