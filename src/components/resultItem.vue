<template>
  <div class="item" @click="onItemClick">
    <div class="content-box">
      <component :is="frame" :source="source" @ready="hidePreloader" />
    </div>
    <div :class="['preloader', { ['visible']: showPlaceholder }]"></div>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  computed,
  defineAsyncComponent,
  ref,
} from "vue";
const props = defineProps({
  unit: {
    type: Object,
    default() {
      return {};
    },
  },
  perfomanceMode: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["click"]);
const hidePreloader = () => {
  showPlaceholder.value = false;
};

const showPlaceholder = ref(true);

const frame = computed(() => {
  return props.perfomanceMode
    ? defineAsyncComponent(() => import("@/components/videoFrame.vue"))
    : defineAsyncComponent(() => import("@/components/imageFrame.vue"));
});
const source = computed(() => {
  return props.perfomanceMode
    ? props.unit.previewURL
    : props.unit.reservePreviewURL;
});

const onItemClick = () => {
  navigator.clipboard.writeText(props.unit.originURL);

  emit("click");
};
</script>
<style lang="stylus" scoped>
.item {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #222;
  color: white;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.95) translateY(3px);
  }

  &.loaded {
    .preloader {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.content-box, .preloader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.content-box {
  z-index: 1;
  cursor: pointer;
}

.preloader {
  z-index: 2;
  background: red;
  transition: opacity 0.25s ease;
  background: url('http://leonardo.osnova.io/63a39c16-d35d-560e-a6bd-2675159bbaf9/') 50% 50% / 100% auto no-repeat;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: unset;
  }
}
</style>
