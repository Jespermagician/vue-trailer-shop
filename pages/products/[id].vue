<template>
    <web-header />
    <div id="details">
      <img  v-if="item" :src="item.picture" alt="Anhänger Bild" />
      <div>
        <h1 v-if="item">Mietvertrag: {{ item.name }} ({{ item.type }})</h1>
        <p v-if="item">Kosten: {{ item.costs }} €</p>
        <p v-if="item">Kapazität: {{ item.capacity }} Fahrräder</p>
        <p v-if="item">Kennzeichen: {{ item.plate }}</p>
      </div>
    </div>
    <div class="form-container">
      
  
      <form @submit.prevent="submitForm">
        <!-- Mietparteien -->
        <section class="section">
          <h3>Mietparteien</h3>
          <div class="field">
            <label for="tenant">Mieter (Name, Vorname, Firma)</label>
            <input type="text" v-model="formData.tenant" id="tenant" placeholder="Firma / Name / Vorname" required />
          </div>
          <div class="field">
            <label for="address">Adresse (Straße & Hausnummer)</label>
            <input type="text" v-model="formData.address" id="address" placeholder="Königstraße 60" required />
          </div>
          <div class="field">
            <label for="zipcode">Postleitzahl</label>
            <input type="text" v-model="formData.zipcode" id="zipcode" placeholder="01099" required />
          </div>
          <div class="field">
            <label for="city">Ort</label>
            <input type="text" v-model="formData.city" id="zipcode" placeholder="Dresden" required />
          </div>
          <div class="field">
            <label for="contact">Telefon</label>
            <input type="tel" v-model="formData.tel" id="contact" placeholder="0 1234 5678" required />
          </div>
          <div class="field">
            <label for="contact">E-Mail-Adresse</label>
            <input type="email" v-model="formData.email" id="contact" placeholder="tom@atolix.com" required />
          </div>
          <div class="field">
            <label for="idNumber">Personalausweisnummer / Führerscheinnummer</label>
            <input type="text" v-model="formData.idNumber" id="idNumber" required />
          </div>
        </section>
  
        <!-- Mietdauer -->
        <section class="section">
          <h3>Mietdauer</h3>
          <div class="field">
            <label for="startDate">Mietbeginn</label>
            <input type="date" v-model="formData.startDate" id="startDate" required />
          </div>
          <div class="field">
            <label for="endDate">Mietende</label>
            <input type="date" v-model="formData.endDate" id="endDate" required />
          </div>
        </section>
  
        <!-- Zubehör -->
        <section class="section">
  <h3>Zubehör</h3>
  <div class="checkbox-group">
    <label class="form-row">
      <p>Spanngurte</p>
      <input type="number" v-model="formData.tensionBelt" id="accessories" required />
    </label>
    <label class="form-row">
      <p>Diebstahlsicherung</p>
      <input type="checkbox" v-model="formData.theftProtection" value="Diebstahlsicherung" />
    </label>
    <label class="form-row">
      <p>Seilwinde & Kurbel</p>
      <input type="number" v-model="formData.cableWinch" id="accessories" required/>
    </label>
    <label class="form-row">
      <p>Adapter (7/13 polig):</p>
      <input type="number" v-model="formData.adapter" id="accessories"  required />
    </label>
    <label class="form-row">
      <p>Hebel f. Hydraulikpumpe</p>
      <input type="number" v-model="formData.lever" id="accessories" required  />
    </label>
    <label class="form-row" for="moreInput">
      <p>Sonstige</p>
      <input id="moreInput" type="checkbox" v-model="formData.moreInput" value="Sonstige" />
</label>
  </div>
  <div class="field" v-if="formData.moreInput">
    <input type="text" v-model="formData.otherAccessories" id="otherAccessories" placeholder="product, product, ..." />
  </div>
</section>
	<!-- Mietpreis -->
	<section class="section">
		<h3>Mietpreis</h3>
        </section>
        <!-- Submit Button -->
        <button type="submit">Formular absenden</button>
      </form>
    </div>
</template>
  
<script setup lang="ts">

    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'


    type Trailer = {
    type: string;
    name: string;
    id: number;
    costs: number;
    plate: string;
    capacity: number; // Korrigiert: `capacity` sollte ein Zahlentyp sein
    picture: string; // Optional: Bild des Anhängers
  };

    // ID aus der URL holen
    const { id } = useRoute().params
    const item = ref<Trailer | null>(null)

    const { data: trailers } = await useFetch('/api/products')
    if(trailers.value !== null)
    {
      const foundItem = trailers.value.find((trailer: any) => trailer.id === Number(id))
      if(foundItem)
        item.value = foundItem
      else 
        console.log("not found")
    }
  
  const formData = ref({
    landlord: '',
    tenant: '',
    address: '',
    zipcode: '',
    city: '',
    tel: '',
    email: '',
    idNumber: '',
    startDate: '',
    endDate: '',
    tensionBelt: 0,
    theftProtection: false,
    cableWinch: 0,
    adapter: 0, 
    lever: 0,
    moreInput: false,
    otherAccessories: '',
  })
  const Price = {
	tensionBelt: 30.00,

  }
  
  // Watcher für Berechnung des Gesamtpreises
//   watch(
//     () => formData.value.trailerPrice + formData.value.accessoryPrice,
//     (newValue) => {
//       formData.value.totalPrice = newValue + (newValue * 0.19) // Berechnung mit 19% MwSt.
//     },
//   )
  
  const submitForm = () => {
    console.log(formData.value)
    // Hier könntest du das Formular absenden oder weitere Aktionen durchführen
  }
  </script>
  
<style scoped>
  .checkbox-group {
    display: flex;
    flex-direction: column; /* Zeilenlayout für die Labels */
    gap: 1rem; /* Abstand zwischen den Zeilen */
  }

  .form-row {
    display: flex;
    align-items: center; /* Vertikale Zentrierung von Text und Input */
    justify-content: space-between; /* Abstand zwischen Text und Input */
    gap: 1rem; /* Abstand zwischen Text und Eingabefeld */
  }

  .form-row p {
    margin: 0; /* Entfernt unnötige Abstände um den Text */
    flex: 1; /* Text nimmt maximalen verfügbaren Platz ein */
  }

  .form-row input[type="number"] {
    max-width: 80px; /* Minimale Breite für Nummernfelder */
    padding: 0.5rem; /* Angemessene Innenabstände */
  }

  .form-row input[type="checkbox"] {
    width: auto; /* Checkbox bleibt kompakt */
  }

    #details {
      display: flex; /* Aktiviert Flexbox */
      padding: 2rem;
      margin: 2rem;
      align-items: center; /* Zentriert das Bild und den Text vertikal */
      gap: 1rem; /* Abstand zwischen Bild und Text */
    }

    #details img {
      max-width: 200px; /* Begrenzung der Bildbreite */
      height: auto; /* Stellt sicher, dass das Bild proportional skaliert */
    }

    #details div {
      flex: 1; /* Der Text nimmt den restlichen verfügbaren Platz ein */
    }

  	h1{
      font-size: 2rem;
      font-weight: bolder;
    }

  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .field {
    margin-bottom: 10px;
  }
  
  input[type="text"], input[type="number"], input[type="date"], input[type="checkbox"], input[type="tel"], input[type="email"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  