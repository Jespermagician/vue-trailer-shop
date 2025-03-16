<template>
    <web-header />
    <div id="container">
      <!-- Profilanzeige -->
      <div id="profile">
        <!-- <img src="../images/pkw-anhänger-lokalisiert-auf-weiß-53993015.webp" alt="Profilbild" class="profile-img" /> -->
        <h2>Max Mustermann</h2>
        <p>Email: max@example.com</p>
        <p>Telefon: +49 123 456789</p>
      </div>
  
      <!-- Statische Kartenanzeige -->
      <div id="card">
        <img src="../images/pkw-anhänger-lokalisiert-auf-weiß-53993015.webp" alt="Anhänger Bild" class="card-img" />
        <div>
          <h1>Fahrradanhänger (Modell X)</h1>
          <p>Kosten: 20 € / Tag</p>
          <p>Kapazität: 3 Fahrräder</p>
          <p>Kennzeichen: ABC-1234</p>
          <p>Ausgeliehen am: 01-01-1999</p>
          <div><button type="submit">Zurück geben</button></div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    #container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem;
    }
  
    #profile {
      text-align: center;
    }
  
    #card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
  
    .profile-img, .card-img {
      max-width: 100%;
      border-radius: 8px;
    }
  
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    button {
    padding: 10px 20px;
    margin: 5%;
    background-color: #216623;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  