<template>
  <GiphyDropdown class="g-dropdown-container" />
</template>

<script setup>
import GiphyDropdown from "./components/GiphyDropdown.vue";
</script>

<style lang="stylus">
#giphyDropRoot {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  font-weight: 400;
  display: grid;
  grid-template-columns: minmax(15px, 1fr) minmax(290px, 840px) minmax(15px, 1fr);
  grid-template-rows: auto;
  padding: 20px 0;
  box-sizing: border-box;

  @media all and (max-width: 670px) {
    padding: 0;
    grid-template-columns: 1fr;
  }

  .g-dropdown-container {
    width: 100%;
    grid-area: 1 / 2;

    @media all and (max-width: 670px) {
      grid-area: 1 / 1;
    }
  }

  * {
    box-sizing: border-box;
  }
}
</style>
