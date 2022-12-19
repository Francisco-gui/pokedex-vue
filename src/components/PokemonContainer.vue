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
      loading: false,
    }
  },

  methods: {
    async fetchPokemon(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.nextUrl = data.next;
        this.fetchPokemonDetail(data.results);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPokemonDetail(pokemons) {
      try {
        for (const pokemon of pokemons){
          let pokemonDetail = await fetch(pokemon.url);
          pokemon.data = await pokemonDetail.json();
        }
        this.pokemons.push(...pokemons);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async searchPokemon(name) {
      if(!name) {
        this.fetchPokemon(this.currentUrl);
        return;
      }
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+name)
        const pokemon = await response.json();
        if(!pokemon) return;  
        this.pokemons = [{name, data: {...pokemon}}]
      } catch (error) {
        console.log(error);
      }
    },
    showPokemonDetail(id) {
      this.showDetail = true;
      this.pokemonId = id;
    },
    handleNextData() {
      if(!this.nextUrl || this.currentUrl === this.nextUrl || this.pokemons.length === 1) return;
      this.fetchPokemon(this.nextUrl);
    },
    handleDetail() {
      this.showDetail = false;
      this.pokemons = [];
      this.fetchPokemon(this.currentUrl);
    },
    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50 && !this.loading) {
        this.loading = true;
        this.handleNextData();
      }
    }  
  },

  mounted() {
    this.fetchPokemon(this.currentUrl);
    window.addEventListener('scroll', this.handleScroll)
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
