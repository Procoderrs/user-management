<script setup>
import {ref,computed,watch} from 'vue';
import {useUsers} from '../composables/useUsers.js'
import { useRouter } from 'vue-router';

const router=useRouter()

function goToEdit(user){
 router.push(`/edit-user/${user.id}`)
}

//get user from composable
const {
  users,deleteUser,
}=useUsers()


const props=defineProps({
  user:Object,
  isEdit:Boolean,
})

const search =ref('')
const filterUser=computed(()=>{
 return  users.value.filter(user=>user.username.toLowerCase().includes(search.value.toLowerCase()))
})

watch(search,(newValue)=>{
  console.log('search changes:' , newValue);
})




</script>

<template>
  <div class="py-12 shadow-xl mb-3 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white">
 
    <h1 class="text-2xl font-bold mb-4 text-center pt-4  text-cyan-800 dark:text-white">User Management</h1>
 
    <p class="text-cyan-700 dark:text-white text-sm text-center pb-5 ">
      Manage all users in one place. Control access, design roles, and monitor activity across your platform.
    </p>

    <div class="flex  flex-col items-center  ">
  <input
    v-model="search"
    type="text"
    placeholder="search users"
    class="border p-2 mb-2  rounded outline-none"
  />
  <div v-if="search" class="flex flex-col"  >
  <div v-if="filterUser.length" class="flex flex-col">
  <div  v-for="user in filterUser" :key="user.id " class="px-4  flex flex-col text-cyan-900">

  </div>
  </div>
  <div v-else class="px-4 text-red-500">
  no users found
  </div>
  </div>
  </div>

    <div v-if="loading" class="text-center mt-4">Loading users...</div>

    <div v-else>
    
      <!-- Headings Row -->
      <div class=" hidden lg:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr_2fr] items-center py-4  pl-4 w-full pt-4 border-b text-cyan-900 dark:text-white font-semibold">
        <p>Username</p>
        <p>Email</p>
        <p>City</p>
        <p>Phone</p>
        <p>Website</p>
        <p>Company</p>
      </div>
   <div
  v-for="user in filterUser"
  :key="'card-' + user.id"
  class="lg:hidden border p-4 my-2 rounded-md bg-white dark:bg-gray-900 text-cyan-900 dark:text-white shadow-sm"
>
  <div class="mb-2 flex items-center justify-between"><strong>Username:</strong> {{ user.username }}</div>
  <div class="mb-2 flex items-center justify-between"><strong>Email:</strong> {{ user.email }}</div>
  <div class="mb-2 flex items-center justify-between"><strong>City:</strong> {{ user.address?.city || 'N/A' }}</div>
  <div class="mb-2 flex items-center justify-between"><strong>Phone:</strong> {{ user.phone }}</div>
  <div class="mb-2 flex items-center justify-between"><strong>Website:</strong> {{ user.website }}</div>
  <div class="mb-2 flex items-center justify-between"><strong>Company:</strong> {{ user.company?.name }}</div>
  <div class="flex gap-4 mt-3">
    <img class="w-6 h-6 cursor-pointer" src="/editing.png" alt="Edit" @click="goToEdit(user)" />
    <img class="w-6 h-6 cursor-pointer" src="/delete.png" alt="Delete" @click="deleteUser(user.id)" />
  </div>
</div>
         
      <!-- Users List -->
      <div
        v-for="user in filterUser"
        :key="user.id"
        class="hidden lg:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr_1fr_1fr] pl-4 w-full py-4 items-center border text-sm text-cyan-700 dark:text-white">
        <p class="flex gap-3 items-center text-cyan-900 dark:text-white font-semibold text-base"> <img class="w-6 h-6  " src="/icons.svg" alt=""> {{ user.username }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.address?.city || 'N/A' }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ user.website }}</p>
        <p>{{ user.company?.name }}</p>
        <img  class=" p-2 dark:bg-white rounded-lg w-8 h-8 cursor-pointer" src="/editing.png"  alt="Edit" @click="goToEdit(user)">
        <img   class="p-2 dark:bg-white rounded-lg w-8 h-8" src="/delete.png" alt="Delete" @click="deleteUser(user.id)">

      </div>
    </div>

   
 
  </div>

  
</template>



