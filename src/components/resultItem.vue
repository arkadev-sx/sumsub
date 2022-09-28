<template>
  <button
    class="item"
    :class="[{ ['ready']: itemIsReady }]"
    v-on:click="onItemClick"
  >
    <div class="content-box">
      <component :is="frame" :source="source" @ready="unlockItem" />
    </div>
    <div class="preloader" :class="[{ ['visible']: !itemIsReady }]"></div>
  </button>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  computed,
  defineAsyncComponent,
  ref,
  onBeforeMount,
} from "vue";
import { preloadIMG } from "@/helpers/preloadIMG";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
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
onBeforeMount(() => {
  preloadIMG("http://leonardo.osnova.io/63a39c16-d35d-560e-a6bd-2675159bbaf9/");
});
const unlockItem = () => {
  itemIsReady.value = true;
};

const itemIsReady = ref(false);

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

const onItemClick = async () => {
  try {
    await toClipboard(props.unit.originURL);
    emit("click");
  } catch (e) {
    console.error(e);
  }
};
</script>
<style lang="stylus" scoped>
.item {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #222;
  color: white;
  position: relative;
  transition: all 0.25s ease;
  pointer-events: none;
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  outline: transparent;
  appearance: none;
  border: none;
  cursor: pointer;

  &.ready {
    pointer-events: unset;
  }

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
  border-radius: inherit;
  pointer-events: none;
}

.content-box {
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
}

.preloader {
  z-index: 2;
  background: red;
  transition: opacity 0.25s ease;
  background: url('http://leonardo.osnova.io/63a39c16-d35d-560e-a6bd-2675159bbaf9/') 50% 50% / 100% auto no-repeat;
  opacity: 0;

  &.visible {
    opacity: 1;
    pointer-events: unset;
  }
}
</style>
