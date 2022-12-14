<template>
  <input type="search" placeholder="Pesquise por nome ou código" class="search" v-model="item" @input="$emit('search', item)">
</template>

<script>


export default {
  name: 'PokemonSearch',

  data() {
    return {
      item: '',
    }
  }

}
</script>


<style lang="css" scoped>
  .search {
    width: 100%;
    min-height: 48px;
    padding-left: 37px;
    padding-right: 19px;
    margin-top: 20px;
    border-radius: 50px;
    border: 1px solid #E1E1E1;
    background-color: #FFFF;
  }

</style>
