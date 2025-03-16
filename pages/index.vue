<template>
  <div id="main">
    <WebHeader />
    <div id="body">
      
      <h1 class="align-middle">Anhängerverleih Müller</h1>
      <img id="logo" src="../images/tractor-1548779_1280.jpg" alt="Blauer Anhänger, mit vier Reifen, vor grüner Hecke">
      <AppAlert>
        This is an auto-imported component.
      </AppAlert>
      <div class="headlines card">
        <h2>Zuverlässig seit 2 Generationen!</h2>
      </div>
      <div class="headlines card">
        <h2>Schnell, Günstig, Robust!</h2>
      </div>
      <About />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .headlines{
    padding: 1rem;  
  }
  .headlines.h1{
    font-size: 130%;
    font-weight: bold;
  }
  h1 {
    display: flex;
    justify-content: center;
    font-size: 300%;
    font-weight: bolder;
    text-align: center;
    padding: 3rem 3rem;
  }

  #logo {
    width: 30rem;
    display: block;
    margin: 3rem auto;
    /* box-shadow: 2px 2px; */
    filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0));
  }

  #body {
    text-align: center;
    padding: 20px;
  }


</style>
