<template>
  <div v-if="pokemon">
    <div class="pokemon-img">
      <img :src="pokemon.sprites.front_default" alt="pokemon-image">
      <p>{{ pokemon.name }}</p>
      <div class="card-attributes">
        <div v-for="(tipo, index) in pokemon.types" :key="index" :class="tipo.type.name">
          {{ tipo.type.name.toUpperCase() }}
        </div>
      </div>
    </div>
    <div class="pokemon-detail">
      <p>Habilidades</p>
    </div>
    <button @click="$emit('details')">voltar</button>
  </div>
</template>

<script>


export default {
  name: 'PokemonDetail',

  data() {
    return {
      pokemon: undefined,
    }
  },

  props: {
    pokemonId: Number,
  },

  methods: {
    async searchPokemon(id) {
      if(!id) {
        return;
      }
      const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+id)
        .then(res => res.json())
      this.pokemon = {...pokemon};
      console.log(this.pokemon);
    },
  },

  beforeMount() {
    this.searchPokemon(this.pokemonId);
  }



}
</script>


<style lang="css" scoped> 
  .pokemon-img {
    width: 540px;
    height: 220px;
    margin: 32px auto;
    margin-bottom: 24px;
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    background: #ffff;
  }

  .pokemon-img img {
    width: 185px;
    height: 110px;
    margin-top: 20px;
    margin-bottom: 7px;
  }

  .pokemon-img p {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .card-attributes {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-attributes div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    width: 64px;
    height: 16px;
    color: #ffff;
    border-radius: 8px;
    font-size: 8px;
    font-weight: 600;
    box-shadow: 0px 4px 20px #E1E1E1;
  }

  .pokemon-detail {
    width: 540px;
    height: 220px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    background: #ffff;
  }

  .pokemon-detail p {
    font-size: 14px;
    font-weight: 700;
    padding-top: 22px;
  }


  .grass {background: #08FEC3}
  .poison {background: #AF08FE;}
  .water {background: #00A3FF;}
  .fire {background:#FE0808;}
  .electric {background: #FFB800;}
  .ground {background: #85826E;}
  .fairy {background:#FBA1EC;}
  .normal {background:#C4C4C4;}
  .flying {background:#5317FC;}
  .default { background: #0E0E0E;}
  .dragon {background: #1B0244; }
  .ice {background: #4EC7FF; }
  .ghost {background: #4A3457; }
  .fighting {background: #7A0000;}
  .psychic {background: #C300FF; }
  .bug {background: #345706; }
  .dark {background: #2B2B2B; }
  .steel {background: #747474; }
  .rock {background: #585F64; }

</style>
