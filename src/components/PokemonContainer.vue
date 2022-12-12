<template>
  <div class="container" :class="showDetail ? 'detail': ''">
    <PokemonDetail v-if="showDetail" @details="showDetail = !showDetail" :pokemonId="pokemonId"/>
    <div v-else>
      <PokemonSearch @search="searchPokemon"/>
      <h3>Pokémons</h3>
      <div class="container-box">
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" @showDetail="showPokemonDetail"/>
      </div>
    </div>
  </div>
</template>

<script>

import PokemonCard from './PokemonCard.vue'
import PokemonSearch from './PokemonSearch.vue'
import PokemonDetail from './PokemonDetail.vue'


export default {
  name: 'PokemonContainer',

  components: {
    PokemonCard,
    PokemonSearch,
    PokemonDetail,
  },

  data() {
    return {
      pokemons: [],
      nextUrl: '',
      currentUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24"',
      showDetail: false,
      pokemonId: null,
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
    async searchPokemon(name) {
      if(!name) {
        this.fetchData(this.currentUrl);
        return;
      }
      const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+name)
        .then(res => res.json())
      this.pokemons = [{name, data: {...pokemon}}]
    },
    showPokemonDetail(id) {
      this.showDetail = true;
      this.pokemonId = id;
    }
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
  .detail {
    height: 100vh;
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
