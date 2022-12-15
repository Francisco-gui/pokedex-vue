<template>
  <div class="container" :class="showDetail ? 'detail': ''">
    <PokemonDetail v-if="showDetail" @details="handleDetail" :pokemonId="pokemonId"/>
    <div v-else>
      <PokemonSearch @search="searchPokemon"/>
      <h3>Pokémons</h3>
      <div class="container-box">
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" @showDetail="showPokemonDetail"/>
      </div>
    </div>
    <div v-observe-visibility="handleNextData"></div>
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
      nextUrl: null,
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
          this.pokemons.push(...pokemons);
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
        .catch((error) => {
          console.log(error);
        })
      if(!pokemon) return;  
      this.pokemons = [{name, data: {...pokemon}}]
    },
    showPokemonDetail(id) {
      this.showDetail = true;
      this.pokemonId = id;
    },
    handleNextData(isVisible) {
      if(!this.nextUrl || this.currentUrl === this.nextUrl || this.pokemons.length === 1 || !isVisible) return;
      this.fetchData(this.nextUrl);
    },
    handleDetail() {
      this.showDetail = false;
      this.pokemons = [];
      this.fetchData(this.currentUrl);
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
    width: 100%;
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
  @media (max-width: 980px) {
    .container {
      width: 330px;
      min-height: 100vh;
    }
    .container h3 {
      display: none;
    }
    .container-box {
      grid-template-columns: 153px 153px;
      grid-gap: 23px;
      justify-content: center;
      align-content: center;
      margin-top: 30px;
    } 
    .detail {
      width: 100%;
    }
  }
</style>
