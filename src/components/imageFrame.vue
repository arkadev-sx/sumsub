<template>
  <div class="image-frame">
    <img :src="props.source" alt="" @load.once="fire" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  source: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["ready"]);

const fire = () => emit("ready");
</script>

<style scoped lang="stylus">
.image-frame {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    min-height: 100%;
    min-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}
</style>
