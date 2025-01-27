<template>
    <div id="body">
        <WebHeader />
        <div class="mt-7 max-w-sm mx-auto text-center card">
            <p class="mt-7 text-7xl font-bold">{{error.statusCode}}</p>
            <p class="mt-7 text-6xl">Ooops.</p>
            <p class="mt-7">{{error.message}}</p>
            <button class="btn my-7" @click="handleError">Go Home...</button>
        </div>
    </div>
  </template>
  
<script setup>
defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
    .card {
        background-color: #f3f4f6;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    #body {
        background-color:  antiquewhite;
        padding: 1rem;
    }
</style>