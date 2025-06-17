<script setup>
import { ref } from 'vue'
import { useUsers } from '../composables/useUsers.js'
import { useRouter } from 'vue-router'

// Router setup for redirect after adding
const router = useRouter()

// Using the composable
const { addUser } = useUsers()

// Form fields
const username = ref('')
const email = ref('')
const phone = ref('')
const website = ref('')
const company = ref('')
const city = ref('')
const error = ref('')
const editingId = ref(null)

// Submit handler
function handleSubmit() {
  if (!username.value || !email.value || !city.value || !company.value || !website.value || !phone.value) {
    error.value = 'All fields are required'
    return
  }

  const newUser = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    company: { name: company.value },
    website: website.value,
    address: { city: city.value },
  }

  addUser(newUser)

  // Optionally reset fields
  username.value = ''
  email.value = ''
  phone.value = ''
  company.value = ''
  website.value = ''
  city.value = ''
  error.value = ''

  // Redirect to home (user list)
  router.push('/')
}
</script>

<template>
  <div class="dark:bg-gray-800 h-screen">
  
  <h2 class="text-center text-2xl text-cyan-800 font-bold dark:text-white pt-6">Add New User</h2>

  <form @submit.prevent="handleSubmit" class="p-4 max-w-md mx-auto dark:text-white">
    <input v-model="username" type="text" placeholder="Name" class="border p-2 mb-2 w-full rounded outline-none " />
    <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-2 w-full rounded outline-none " />
    <input v-model="phone" type="text" placeholder="Phone" class="border p-2 mb-2 w-full rounded outline-none" />
    <input v-model="website" type="text" placeholder="Website" class="border p-2 mb-2 w-full rounded outline-none" />
    <input v-model="company" type="text" placeholder="Company" class="border p-2 mb-2 w-full rounded outline-none" />
    <input v-model="city" type="text" placeholder="City" class="border p-2 mb-4 w-full rounded outline-none" />

    <button type="submit" class="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded w-full">
      {{ editingId ? 'Update User' : 'Add User' }}
    </button>

    <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
  </form>
  </div>
</template>


