<template>
  <div class="container">
    <PokemonSearch />
    <h3>Pokémons</h3>
    <div class="container-box">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"/>
    </div>
  </div>
</template>

<script>

import PokemonCard from './PokemonCard.vue'
import PokemonSearch from './PokemonSearch.vue'


export default {
  name: 'PokemonContainer',

  components: {
    PokemonCard,
    PokemonSearch,
  },

  data() {
    return {
      pokemons: [],
      nextUrl: '',
      currentUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24"',
    }
  },

  methods: {
    async fetchData(url) {
      fetch(url)
        .then(res => res.json())
        .then(async data => {
          this.nextUrl = data.next;
          const pokemons = data.results;
          for (const pokemon of pokemons){
            pokemon.data = await fetch(pokemon.url).then(res => res.json())
          }
          this.pokemons = [...pokemons];
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },

  mounted() {
    this.fetchData(this.currentUrl);
  }

  
}
</script>


<style lang="css" scoped>
  .container {
    width: 815px;
  }
  .container h3 {
    margin-top: 49px;
    margin-bottom: 38px;
    display: flex;
  }
  .container-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
</style>
