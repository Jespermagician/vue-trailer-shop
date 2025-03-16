<template>
  <web-header />
  <div id="body">    
    <div id="details">
      <!-- Trailer-Details anzeigen -->
      <img v-if="item" :src="item.picture" alt="Anhänger Bild" />
      <div>
        <h2>Mietvertrag: </h2>
        <h1 v-if="item">{{ item.name }} ({{ item.type }})</h1>
        <p v-if="item">Kosten: {{ item.costs }} €</p>
        <p v-if="item">Kapazität: {{ item.capacity }} Fahrräder</p>
        <p v-if="item">Kennzeichen: {{ item.plate }}</p>
      </div>
    </div>
  </div>

  <div class="form-container">
    <!-- Mietvertrag-Formular -->
    <form @submit.prevent="submitForm">
      <!-- Mietparteien -->
      <section class="section">
        <h3>Mietparteien</h3>
        <div class="field">
          <label for="tenant">Mieter (Name, Vorname, Firma)</label>
          <input
            type="text"
            v-model="formData.tenant"
            id="tenant"
            placeholder="Firma / Name / Vorname"
            required
          />
        </div>
        <div class="field">
          <label for="address">Adresse (Straße & Hausnummer)</label>
          <input
            type="text"
            v-model="formData.address"
            id="address"
            placeholder="Königstraße 60"
            required
          />
        </div>
        <div class="field">
          <label for="zipcode">Postleitzahl</label>
          <input
            type="text"
            v-model="formData.zipcode"
            id="zipcode"
            placeholder="01099"
            required
          />
        </div>
        <div class="field">
          <label for="city">Ort</label>
          <input
            type="text"
            v-model="formData.city"
            id="city"
            placeholder="Dresden"
            required
          />
        </div>
        <div class="field">
          <label for="contact">Telefon</label>
          <input
            type="tel"
            v-model="formData.tel"
            id="contact"
            placeholder="0 1234 5678"
            required
          />
        </div>
        <div class="field">
          <label for="email">E-Mail-Adresse</label>
          <input
            type="email"
            v-model="formData.email"
            id="email"
            placeholder="tom@atolix.com"
            required
          />
        </div>
        <div class="field">
          <label for="idNumber">Personalausweisnummer / Führerscheinnummer</label>
          <input
            type="text"
            v-model="formData.idNumber"
            id="idNumber"
            placeholder="123456789"
            required
          />
        </div>
      </section>

      <!-- Mietdauer -->
      <section class="section">
        <h3>Mietdauer</h3>
        <div class="field">
          <label for="startDate">Mietbeginn</label>
          <input type="date" @change="dateChanged" v-model="formData.startDate" id="startDate" required />
        </div>
        <div class="field">
          <label for="endDate">Mietende</label>
          <input type="date" @change="dateChanged" v-model="formData.endDate" id="endDate" required />
        </div>
      </section>

      <!-- Zubehör -->
      <section class="section">
        <h3>Zubehör</h3>
        <div class="checkbox-group">
          <label class="form-row">
            <p>Spanngurte: <i>{{ Price.tensionBelt }} €</i></p>
            <input type="number" v-model="formData.tensionBelt" min="0" />
          </label>
          <label class="form-row">
            <p>Diebstahlsicherung: <i>{{ Price.theftProtection }} €</i></p>
            <input type="checkbox" v-model="formData.isTheftProtection" />
          </label>
          <label class="form-row">
            <p>Seilwinde & Kurbel: <i>{{ Price.cableWinch }} €</i></p>
            <input type="number" v-model="formData.cableWinch" min="0" />
          </label>
          <label class="form-row">
            <p>Adapter (7/13 polig): <i>{{ Price.adapter }} €</i></p>
            <input type="number" v-model="formData.adapter" min="0" />
          </label>
          <label class="form-row">
            <p>Hebel für Hydraulikpumpe: <i>{{ Price.lever }} €</i></p>
            <input type="number" v-model="formData.lever" min="0" />
          </label>
          <label class="form-row">
            <p>Sonstige</p>
            <input type="checkbox" v-model="formData.isMoreInput" />
          </label>
        </div>
        <div class="field" v-if="formData.isMoreInput">
          <p style="font-size: smaller;">&#9432 <i>Wird später manuel berechnet</i></p>
          <input
            type="text"
            v-model="formData.otherAccessories"
            placeholder="Sonstiges Zubehör angeben..."
          />
        </div>
      </section>

      <!-- Mietpreis -->
      <section class="section">
        <h2 style="font-size: large; ">Mietpreis</h2>
        <p v-if="item">Anhänger: {{ item.costs }} € / Tag</p>
        <p>Tage: {{ formData.timeDiff }}</p>
        <p v-if="item">Anhänger Insg.: {{ formData.timeDiff * item.costs }}</p>
        <hr style="border-top: 1px solid black; p: 3% 0;">
        <p v-if="formData.tensionBelt > 0">
          Spanngurte: {{ formData.tensionBelt * Price.tensionBelt }} €
        </p>
        <p v-if="formData.isTheftProtection">Diebstahlsicherung: {{ Price.theftProtection }} €</p>
        <p v-if="formData.cableWinch > 0">
          Seilwinde & Kurbel: {{ formData.cableWinch * Price.cableWinch }} €
        </p>
        <p v-if="formData.adapter > 0">Adapter: {{ formData.adapter * Price.adapter }} €</p>
        <p v-if="formData.lever > 0">Hebel: {{ formData.lever * Price.lever }} €</p>
        <hr style="border-top: 1px solid black; p: 3% 0;">
        <p>Gesamtpreis (ohne MwSt.): {{ formData.totalPrice.toFixed(2) }} €</p>
        <p>Gesamtpreis (inkl. MwSt.): {{ formData.totalPriceTaxed.toFixed(2) }} €</p>
      </section>

      <p v-if="!isTimeValid" class="warning">Mietbeginn kann nicht nach Mietende liegen</p>
      <!-- Absenden -->
      <button type="submit">Formular absenden</button>
    </form>
  </div>
</template>

<script setup lang="ts">
    import { NuxtLink } from "#build/components";
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import { useRouter } from 'vue-router';

    const { id } = useRoute().params;
    const item = ref<Trailer | null>(null);

    const router = useRouter();






    const { data: trailers } = await useFetch('/api/products')

    if(trailers.value !== null && trailers.value !== undefined)
    {
      const foundItem = trailers.value.find((trailer: any) => trailer.id === Number(id))
      if(foundItem)
        item.value = foundItem
      else 
      {
        console.log("not found")
        throw createError({statusCode: 404, statusMessage: "Trailer not found. Check the ID!"});
      }
    }
    else
      throw new Error("Trailer not found. Wrong Input!");

    // Preise
    const Price = ref({
      tensionBelt: 7.0,
      theftProtection: 50.0,
      cableWinch: 20.0,
      adapter: 5.0,
      lever: 10.0,
      tax: 0.19,
    });

    // Formulardaten
    const formData = ref({
      tenant: "",
      address: "",
      zipcode: "",
      city: "",
      tel: "",
      email: "",
      idNumber: "",
      startDate: new Date(),
      endDate: new Date(),
      timeDiff: 0,
      tensionBelt: 0,
      isTheftProtection: false,
      cableWinch: 0,
      adapter: 0,
      lever: 0,
      isMoreInput: false,
      otherAccessories: "",
      totalPrice: 0,
      totalPriceTaxed: 0,
    });

    var isTimeValid = ref(true);

    const dateChanged = () => {
      if(!formData.value.startDate || !formData.value.endDate)
        return;
      if(formData.value.startDate > formData.value.endDate)
      {
        // alert("Mietbeginn kann nicht nach Mietende liegen");
        isTimeValid.value = false;
        return;
      }
      isTimeValid.value = true;
      const start = new Date(formData.value.startDate);
      const end = new Date(formData.value.endDate);
      const diff = end.getTime() - start.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      formData.value.timeDiff = days;
      console.log("Mietdauer:", days, "Tage");
    };

    // Gesamtpreisberechnung
    watch(
      () => ({
        trailerPrice: item.value ? item.value.costs : 0,
        tensionBelt: formData.value.tensionBelt,
        isTheftProtection: formData.value.isTheftProtection,
        cableWinch: formData.value.cableWinch,
        adapter: formData.value.adapter,
        lever: formData.value.lever,
      }),
      (values) => {
        let sum = 0;
        sum += values.trailerPrice;
        sum += values.tensionBelt * Price.value.tensionBelt;
        sum += values.isTheftProtection ? Price.value.theftProtection : 0;
        sum += values.cableWinch * Price.value.cableWinch;
        sum += values.adapter * Price.value.adapter;
        sum += values.lever * Price.value.lever;


        formData.value.totalPrice = sum;
        formData.value.totalPriceTaxed = sum + sum * Price.value.tax;
      },
      { deep: true,  immediate: true }
    );

    const submitForm = () => {
      if(!isTimeValid.value)
      {
        alert("Mietbeginn kann nicht nach Mietende liegen");
        const dateInput = document.getElementById("startDate");
        dateInput?.focus();
        dateInput?.scrollIntoView({behavior: 'smooth'});
        return;
      }
      console.log("Formulardaten:", formData.value);

      const cartId: number = Math.floor(Math.random() * 6) + 1;
      navigateTo(cartId);
      
    };


    const navigateTo = (cartId: number) => {
      const routeOptions = {
        path: '/products/cart',
        query: {id: cartId},
      };

      const { path, query } = routeOptions;

      router.push({
        path,
        query, // Route-Parameter
      });
    };


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

  #body {
    margin: 20px;
  }

  #details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
}

#details img {
  max-width: 150px;
  border-radius: 8px;
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

  .warning {
    color: red;
    font-weight: bold;
  }
</style>
  