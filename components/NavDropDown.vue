<template>
  <div class="flex gap-4">
    <template v-if="!isAuthenticated">
      <button @click="loginWithRedirect" class="btn">Login</button>
      <button @click="signUp" class="btn">Sign Up</button>
    </template>
    <template v-else>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 mr-2 rounded-full" :src="user.picture" alt="user photo" />
        {{ user.name }}
        <svg
          class="w-4 h-4 mx-1.5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        id="dropdownAvatarName"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div class="font-medium truncate">{{ user.email }}</div>
        </div>
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          <li>
            <NuxtLink
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              to="/profile"
            >
              Profile
            </NuxtLink>
          </li>
        </ul>
        <div class="py-2">
          <a
            href="#"
            @click="logout"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Sign out</a
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted } from 'vue';
import { initDropdowns } from 'flowbite';

const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
const signUp = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });

onMounted(() => {
  initDropdowns();
});
</script>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>