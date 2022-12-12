<template>
  <div>
    <div class="card-container" @click="$emit('showDetail', pokemon.data.id)">
      <img :src="pokemon.data.sprites.front_default" alt="pokemon-image">
      <p>{{ pokemon.name }}</p>
      <span>Cód: {{ pokemon.data.id }}</span>
      <div class="card-attributes">
        <div v-for="(tipo, index) in pokemon.data.types" :key="index" :class="tipo.type.name">
          {{ tipo.type.name.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: 'PokemonCard',

  props: {
    pokemon: Object,
  },
}
</script>


<style lang="css" scoped>
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 153px;
    height: 190px;
    background-color: #ffff;
    border-radius: 8px;
    margin-bottom: 31px;
  }
  .card-container img {
    margin-top: 12px;
    margin-bottom: 14px;
    width: 47px;
    height: 39px;
  }
  .card-container p {
    font-size: 14px;
    font-weight: 700;
  }
  .card-container span {
    font-size: 9px;
    font-weight: 700;
    margin-top: 15px;
    margin-bottom: 53px;
  }
  .card-attributes {
    display: flex;
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
