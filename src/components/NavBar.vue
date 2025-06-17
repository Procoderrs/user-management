<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref,onMounted } from 'vue';
function isActiveLink(routePath){
  const route=useRoute();
  return route.path===routePath;
}



// Theme toggle logic
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const html = document.documentElement

  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// On load, apply theme from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div class=" lg:px-12 py-4 px-3 bg-cyan-700 dark:bg-gray-900   sticky top-0 ">
   <div class="flex items-center justify-between gap-4 ">
   <img class="lg:w-12 lg:h-12 w-8 h-8 bg-white flex items-center p-2 rounded-full" src="/profile (1).png" alt="">


   <ul class="flex items-center justify-center text-lg text-white lg:gap-16 gap-2">
   <li class="p-2 text-sm text-nowrap"><RouterLink to="/" :class="[isActiveLink('/')? 'bg-cyan-800': 'hover:bg-cyan-800', 'px-2', 'py-2' ,'rounded-md']" >Home</RouterLink></li>
   <li class="text-sm text-nowrap p-2"><RouterLink to="/add-user" :class="[isActiveLink('/add-user')? 'bg-cyan-800': 'hover:bg-cyan-800', 'px-3', 'py-2' ,'rounded-md']">Add User</RouterLink></li>
   <li>
          <button
            @click="toggleTheme"
            class="bg-cyan-800 hover:bg-cyan-900 px-2 text-sm text-nowrap py-2 rounded-md"
          >
            {{ isDark ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </li>
   </ul>
   </div>
  </div>
</template>