<script setup lang="ts">
const props = defineProps({
  review: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="p-4 rounded-lg bg-white shadow-xl h-full flex items-center space-x-6 mb-4">
    <!-- Bildbereich mit mehr Kontrast -->
    <!-- :src="require(`@/${review.picture}`)" -->
    <NuxtImg  :src="review.picture" 
        alt="Anhänger Bild"
        class="w-24 h-24 object-cover rounded-md filter contrast-125"
    />

    <!-- Details-Bereich -->
    <div class="flex-1">
      <!-- Titel -->
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ review.name }} ({{ review.type }})</h2>

      <!-- Details -->
      <p class="text-gray-700">Kosten: <span class="font-medium">{{ review.costs }} €</span></p>
      <p class="text-gray-700">Kapazität: <span class="font-medium">{{ review.capacity }} Fahrräder</span></p>
      <p class="text-gray-700">Kennzeichen: <span class="font-medium">{{ review.plate }}</span></p>

      
        <NuxtLink :to="`/products/${review.id}`" class="btn btn-primary mt-4">
          Details
        </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Zusätzliche Anpassungen für mehr Kontrast und Abstände */
</style>
