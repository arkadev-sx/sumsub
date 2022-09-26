<template>
  <div class="results-box">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="stylus" scoped>
.results-box {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  padding-right: 20px;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 12px;
  justify-content: space-between;

  @media all and (max-width: 669px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 8px;
  }

  @media all and (max-width: 374px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
