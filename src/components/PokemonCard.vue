<template>
  <div>
    <div class="card-container">
      <img :src="pokemon.sprites.front_default" alt="pokemon-image">
      <p>{{ pokemon.name }}</p>
      <span>Cód: {{ pokemon.id }}</span>
      <div class="card-attributes">
        <div v-for="(tipo, index) in pokemon.types" :key="index">
          {{ tipo.type.name }}
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

  mounted() {
    console.log(this.pokemon);
  }

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
  .card-attributes div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 16px;
    background-color: #08FEC3;
    color: #ffff;
    border-radius: 8px;
    font-size: 8px;
    font-weight: 600;
    box-shadow: 0px 4px 20px #E1E1E1;
  }
</style>
