import { createRouter,createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import EditUserView from '../views/EditUserView.vue'
import AddUserView from "../views/AddUserView.vue";

const routes=[
  {path:'/',
    name:'Home',
    component:HomeView,
  },
  {path: '/edit-user/:id',  // ✅ dynamic segment
    name: 'Edit-user',
    component: EditUserView
  },

  {path: '/add-user',  // ✅ dynamic segment
    name: 'Add-user',
    component: AddUserView
  },

]
const router=createRouter({
  history:createWebHistory(),
  routes,
})

export default router;