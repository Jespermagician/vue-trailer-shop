<template>
    <web-header />
    <h2>Mietvertrag</h2>
    <div>
            <!-- <h1>{{ item.type }}</h1> -->
            <h1 v-if="item">{{ item.name }} ({{ item.type }})</h1>
            <p v-if="item">Kosten: {{ item.costs }} €</p>
            <p v-if="item">Kapazität: {{ item.capacity }} Fahrräder</p>
            <p v-if="item">Kennzeichen: {{ item.plate }}</p>
            <!-- <img v-if="item" :src="item.picture" alt="Anhänger Bild" /> -->
        </div>
    <div class="form-container">
      
  
      <form @submit.prevent="submitForm">
        <!-- Mietparteien -->
        <section class="section">
          <h3>Mietparteien</h3>
          <div class="field">
            <label for="landlord">Vermieter (Name, Vorname, Firma)</label>
            <input type="text" v-model="formData.landlord" id="landlord" placeholder="Firma / Name / Vorname" required />
          </div>
          <div class="field">
            <label for="tenant">Mieter (Name, Vorname, Firma)</label>
            <input type="text" v-model="formData.tenant" id="tenant" placeholder="Firma / Name / Vorname" required />
          </div>
          <div class="field">
            <label for="address">Adresse (Straße & Hausnummer)</label>
            <input type="text" v-model="formData.address" id="address" placeholder="Königstraße 60" required />
          </div>
          <div class="field">
            <label for="zipcode">Postleitzahl & Ort</label>
            <input type="text" v-model="formData.zipcode" id="zipcode" placeholder="25709 Marne" required />
          </div>
          <div class="field">
            <label for="contact">Telefon / E-Mail-Adresse</label>
            <input type="text" v-model="formData.contact" id="contact" placeholder="Telefonnummer / E-Mail" required />
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
            <label><input type="checkbox" v-model="formData.accessories" value="Spanngurte" /> Spanngurte</label>
            <label><input type="checkbox" v-model="formData.accessories" value="Diebstahlsicherung" /> Diebstahlsicherung</label>
            <label><input type="checkbox" v-model="formData.accessories" value="Seilwinde & Kurbel" /> Seilwinde & Kurbel</label>
            <label><input type="checkbox" v-model="formData.accessories" value="Adapter 7/13 polig" /> Adapter 7/13 polig</label>
            <label><input type="checkbox" v-model="formData.accessories" value="Hebel f. Hydraulikpumpe" /> Hebel f. Hydraulikpumpe</label>
            <label><input type="checkbox" v-model="formData.accessories" value="Sonstige" /> Sonstige</label>
          </div>
          <div class="field" v-if="formData.accessories.includes('Sonstige')">
            <label for="otherAccessories">Sonstige Zubehör (bitte angeben)</label>
            <input type="text" v-model="formData.otherAccessories" id="otherAccessories" />
          </div>
        </section>
  
        <!-- Mietpreis -->
        <section class="section">
          <h3>Mietpreis</h3>
          <div class="field">
            <label for="trailerPrice">Anhänger Preis (EUR)</label>
            <input type="number" v-model="formData.trailerPrice" id="trailerPrice" placeholder="Anhänger Preis" required />
          </div>
          <div class="field">
            <label for="accessoryPrice">Zubehör Preis (EUR)</label>
            <input type="number" v-model="formData.accessoryPrice" id="accessoryPrice" placeholder="Zubehör Preis" />
          </div>
          <div class="field">
            <label for="totalPrice">Gesamtpreis (EUR)</label>
            <input type="number" v-model="formData.totalPrice" id="totalPrice" placeholder="Gesamtpreis" readonly />
          </div>
          <div class="field">
            <label for="paymentMethod">Zahlungsweise</label>
            <input type="text" v-model="formData.paymentMethod" id="paymentMethod" required />
          </div>
          <div class="field">
            <label for="deposit">Kaution (EUR)</label>
            <input type="number" v-model="formData.deposit" id="deposit" placeholder="Kaution" required />
          </div>
        </section>
  
        <!-- Submit Button -->
        <button type="submit">Formular absenden</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">

    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'

    // ID aus der URL holen
    const { id } = useRoute().params
    const item = ref<Trailer | null>(null)

    onMounted(async () => {
        // Fetch Trailer-Daten
        const { data: trailers } = await useFetch('/api/products')
        
        // Wenn Daten erfolgreich abgerufen wurden, nach dem Trailer mit der ID suchen
        if (Array.isArray(trailers.value)) {
            const foundItem = trailers.value.find((trailer: Trailer) => trailer.id === Number(id))
            item.value = foundItem || null // Falls kein Trailer gefunden wurde, null setzen
        }
    });
  
  const formData = ref({
    landlord: '',
    tenant: '',
    address: '',
    zipcode: '',
    contact: '',
    idNumber: '',
    startDate: '',
    endDate: '',
    accessories: [],
    otherAccessories: '',
    trailerPrice: 0,
    accessoryPrice: 0,
    totalPrice: 0,
    paymentMethod: '',
    deposit: 0,
  })
  
  // Watcher für Berechnung des Gesamtpreises
  watch(
    () => formData.value.trailerPrice + formData.value.accessoryPrice,
    (newValue) => {
      formData.value.totalPrice = newValue + (newValue * 0.19) // Berechnung mit 19% MwSt.
    },
  )
  
  const submitForm = () => {
    console.log(formData.value)
    // Hier könntest du das Formular absenden oder weitere Aktionen durchführen
  }
  </script>
  
  <style scoped>
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
  
  input[type="text"], input[type="number"], input[type="date"], input[type="checkbox"] {
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
  