<template>
  <div class="results-box" @scroll="onScroll">
    <div class="container">
      <slot></slot>
      <div class="marker" v-observe-visibility="visibilityChanged"></div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["readyToUpdate"]);
const visibilityChanged = (isVisible) => {
  if (isVisible) emit("readyToUpdate");
};
</script>

<style lang="stylus" scoped>
.results-box {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  padding-right: 20px;

  @media all and (max-width: 669px) {
    overflow-y: unset;
    padding-right: 0;
  }
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
  user-select: none;

  // transition: all 0.4s ease;
  // transform: translateY(5px);
  // opacity: 0;

  // &.visible {
  // transform: translateY(0);
  // opacity: 1;
  // }
  @media all and (max-width: 669px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 8px;
    position: relative;
  }

  @media all and (max-width: 374px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.marker {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70vh;
  pointer-events: none;
}
</style>
