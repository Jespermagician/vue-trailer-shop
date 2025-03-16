<template>
  <header class="shadow-sm bg-gray-50">
    <nav class="container mx-auto py-4 px-6 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">Verleih Müller</NuxtLink>
      
      <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <div :class="{'hidden': !isMenuOpen, 'flex': isMenuOpen}" class="absolute md:relative top-16 left-0 w-full md:w-auto md:top-auto md:left-auto md:flex md:gap-4 bg-gray-50 md:bg-transparent flex-col md:flex-row text-center md:text-right shadow-md md:shadow-none p-4 md:p-0">
        <NuxtLink to="/" class="py-2 md:py-0">Home</NuxtLink>
        <NuxtLink to="/about" class="py-2 md:py-0">About</NuxtLink>
        <NuxtLink to="/profile" class="py-2 md:py-0">Profil</NuxtLink>
        <NuxtLink to="/products" class="py-2 md:py-0">Shop</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
#logo {
  max-width: 5rem;
  max-height: 3rem;
}

.router-link-exact-active {
  color: #12b488;
}
</style>