// src/composables/useUsers.js
import { ref, onMounted } from 'vue'
import axios from 'axios'




function saveToLocalStorage(users){
  localStorage.setItem('users',JSON.stringify(users))
}

function loadFromLocalStorage(){
  const data=localStorage.getItem('users');
  return data ? JSON.parse(data):null
}



export function useUsers() {
  const users = ref([])
  const loading = ref(true)

  // ✅ Fetch users from API
  async function fetchUsers() {
    try {
      const localData=loadFromLocalStorage()
      if(localData && localData.length>0){
        users.value=localData
      }
      else{
 const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      users.value = res.data;
      saveToLocalStorage(users.value)
      }
     
    } catch (error) {
      console.log('Error fetching users:', error)
    } finally {
      loading.value = false
    }
  }

  // ✅ Add user (with local ID)
  function addUser(user) {
    user.id = Date.now()
    users.value.push(user)
    saveToLocalStorage(users.value)
  }
  

  // ✅ Update user
  function updateUser(id, newUser) {
    const i = users.value.findIndex(u => u.id === id)
    if (i == -1) {
      console.log(`user with id ${id} not found`);
      return;
    }
users.value[i] = { ...users.value[i], ...newUser }

    console.log('after update with' , newUser);
    console.log('all current users',users.value);
        saveToLocalStorage(users.value)

  }

  // ✅ Delete user
  function deleteUser(id) {
    users.value = users.value.filter(u => u.id !== id)
        saveToLocalStorage(users.value)

  }

  // ✅ Automatically fetch on setup
  onMounted(fetchUsers)

  return {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
  }
}
