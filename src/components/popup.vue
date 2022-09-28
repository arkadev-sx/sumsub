<template>
  <div class="popup">
    <div
      class="picture-box"
      :style="`background-image: url(${props.image})`"
    ></div>
    <div class="message-box">{{ props.msg }}</div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount } from "vue";
import { preloadIMG } from "@/helpers/preloadIMG";

const props = defineProps({
  msg: { type: String, default: "hi there" },
  image: { type: String, default: "" },
});

onBeforeMount(() => preloadIMG(props.image));
</script>

<style scoped lang="stylus">
.popup {
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.picture-box {
  width: 180px;
  height: 180px;
  background: 50% 50% / 100% auto no-repeat;
}

.message-box {
  font-size: 14px;
  font-weight: 500;
  color: #444;
}
</style>
