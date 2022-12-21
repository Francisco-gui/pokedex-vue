<template>
  <div class="loader-container" v-if="loading">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
  </div>
</template>

<script>


export default {
  name: 'PageLoader',

  props: {
    loading: Boolean,
  }
}
</script>


<style lang="css" scoped>
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 9;
  }

  .cube {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-color: #3d7dca;
  }

  .cube:first-child {
    animation: left 1s infinite;
    background-color: #ffcb05;
  }

  .cube:last-child {
    animation: right 1s infinite .25s;
    background-color: #003170;
  }

  @keyframes left {
    40% {
      transform: translateX(-60px);
    }

    50% {
      transform: translateX(0);
    }
  }

  @keyframes right {
    40% {
      transform: translateX(60px);
    }

    50% {
      transform: translateX(0);
    }
  }

</style>
