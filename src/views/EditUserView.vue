<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '../composables/useUsers.js';

const route = useRoute();
const router = useRouter();

const {
  users,
  addUser,
  deleteUser,
  updateUser,
 
} = useUsers();

const username = ref('');
const email = ref('');
const phone = ref('');
const website = ref('');
const company = ref('');
const city = ref('');
const error = ref('');
const editingId = ref(null);

// Extract ID from route
const userId = route.params.id;

// If there's an ID in the route, fill the form
watch(users, () => {
  if (!userId) return;

  const userToEdit = users.value.find(user => user.id == userId);
  if (userToEdit) {
    username.value = userToEdit.username;
    email.value = userToEdit.email;
    phone.value = userToEdit.phone;
    website.value = userToEdit.website;
    company.value = userToEdit.company?.name || '';
    city.value = userToEdit.address?.city || '';
    editingId.value = userToEdit.id;
  } else {
    error.value = 'User not found';
  }
}, { immediate: true });

// Form submission
function handleSubmit() {
  if (!username.value || !email.value || !phone.value || !website.value || !company.value || !city.value) {
    error.value = 'All fields are required';
    return;
  }

  const newUser = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    website: website.value,
    company: { name: company.value },
    address: { city: city.value },
  };

  if (editingId.value) {
    updateUser(editingId.value, newUser);
  } else {
    addUser(newUser);
  }

  // Reset form
  username.value = '';
  email.value = '';
  phone.value = '';
  website.value = '';
  company.value = '';
  city.value = '';
  error.value = '';

  // Navigate back
  router.push('/');
}
</script>


<template>
<div class="h-screen dark:bg-gray-800">

<h2 class="text-xl text-center py-4 dark:text-white  ">Edit User</h2>


<form @submit.prevent="handleSubmit" class="p-4 max-w-md mx-auto dark:text-white">

  <input
    v-model="username"
    type="text"
    placeholder="Name"
    class="border p-2 mb-2 w-full rounded outline-none"
  />

  <input
    v-model="email"
    type="email"
    placeholder="Email"
    class="border p-2 mb-2 w-full rounded outline-none"
  />
  <input
    v-model="phone"
    type="text"
    placeholder="phone"
    class="border p-2 mb-2 w-full rounded outline-none"
  />
  <input
    v-model="website"
    type="text"
    placeholder="website"
    class="border p-2 mb-2 w-full rounded outline-none"
  />
  <input
    v-model="company"
    type="text"
    placeholder="company"
    class="border p-2 mb-2 w-full rounded outline-none"
  />

  <input
    v-model="city"
    type="text"
    placeholder="city"
    class="border p-2 mb-2 w-full rounded outline-none"
  />
 



  <button
    type="submit"
    class="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded w-full"
  >
    {{ editingId ? 'Update User' : 'Add User' }}
  </button>
</form>
</div>

</template>