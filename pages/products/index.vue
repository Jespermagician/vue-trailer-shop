<script setup lang="ts">
import { ref } from 'vue';
import ChildComp from './item.vue';

// Begrüßungsnachricht
// const greeting = ref('Hello from parent');


const { data } = await useFetch('/api/products');

</script>

<template>
    <WebHeader />
    <div id="body">
        <!-- <img src="../../images/Müller.logo.png" alt=""> -->
      <h1>Entleihen</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="item in data" :key="item.id">
          <ChildComp :review="item" />
        </div>
      </div>
    </div>
  </template>
  


<style scoped>
/* Beispielhafte Stile */
#body {
    background-color:  antiquewhite;
    padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
