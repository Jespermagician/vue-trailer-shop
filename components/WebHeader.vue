<template>
    <header class="shadow-sm bg-gray-50">
      <nav class="container mx-auto py-4 px-12 flex justify-between text-right">
        <NuxtLink to="/">Verleih Müller</NuxtLink>
        <!-- <NuxtLink to="/"><img src="../images/Müller.logo.png"  id="logo" alt="Logo">Verleiher Müller</NuxtLink> -->
        <div class="flex gap-4">
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/profile">Profil</NuxtLink>
            <NuxtLink to="/products">Shop</NuxtLink>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup></script>
  
  <style scoped>
  #logo{
    max-width: 5rem;
    max-height: 3rem;
  }

  .router-link-exact-active {
    color: #12b488;
  }
  </style>