<template>
  <div class="search-bar">
    <input type="text" name="searchBar" v-model.trim="query" />
    <div :class="['preloader', { ['visible']: isLoading }]"></div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";
let timeout = null;
const INPUT_HANDLE_DELAY = 300;

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
const query = ref(props.modelValue);

watch(query, (nv) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    emit("update:modelValue", nv);
  }, INPUT_HANDLE_DELAY);
});
</script>

<style scoped lang="stylus">
.search-bar {
  padding: 5px 50px 5px 5px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #3d3d3d;
  position: relative;

  input {
    padding: 0;
    width: 100%;
    font-size: 16px;
    border: none;
    background: transparent;
    outline: transparent;
  }
}

.preloader {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scaleX(-1);
  width: 50px;
  height: 30px;
  background: url('http://leonardo.osnova.io/7ad70ae1-c5c1-54e9-b1b8-465909802d9f/') 50% 50% / 100% auto no-repeat; // leonardo.osnova.io/7ad70ae1-c5c1-54e9-b1b8-465909802d9f/) 50% 50%/100% auto no-repeat
  transition: all 0.25s ease;
  pointer-events: none;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
}
</style>
