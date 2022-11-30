<template>
  <div class="container">
    <PokemonSearch />
    <h3>Pokémons</h3>
    <div class="container-box" v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard :pokemon="pokemon"/>
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
    fetchAllData() {
      fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24"')
        .then(res => res.json())
        .then(data => {
          this.nextUrl = data.next;
          data.results.forEach( pokemon => {
            this.fetchPokemonData(pokemon);
          })
        })
        .catch((error) => {
          console.log(error);
        })
    },
    fetchPokemonData(pokemon) {
      let url = pokemon.url;
      fetch(url)
        .then(res => res.json())
        .then( pokemon => {
          this.pokemons.push(pokemon)
        })
        .catch((error) => {
          console.log(error);
        })  
    }
  },

  mounted() {
    this.fetchAllData();
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
