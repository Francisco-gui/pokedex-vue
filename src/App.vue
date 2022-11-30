<template>
  <div id="app">
    <PokemonContainer />
  </div>
</template>

<script>


import PokemonContainer from './components/PokemonContainer.vue'

export default {
  name: 'App',
  components: {
    PokemonContainer,
  }
}
</script>



<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #E5E5E5;
  height: 100vh;
}
</style>
