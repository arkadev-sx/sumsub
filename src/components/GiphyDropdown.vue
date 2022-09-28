<template>
  <div class="giphy-dropdown">
    <SearchBar
      class="g-search-bar"
      :isLoading="loading"
      v-model.trim="searchQueryText"
    />
    <a href="https://giphy.com/" target="_blank" class="logo"></a>
    <ResultsBox class="g-results-box" @readyToUpdate="askMore">
      <ResultItem
        v-for="item in result"
        :key="item.originURL"
        :unit="item"
        :perfomanceMode="isMp4Supporting"
        @click="onItemClick"
      />
    </ResultsBox>
    <transition name="popup">
      <Popup
        class="g-popup"
        :msg="'copied to clipboard!'"
        :image="'http://leonardo.osnova.io/d11c84c6-8364-5c6a-bcf3-a48393fc0a73/'"
        v-show="popupIsVisible"
    /></transition>
  </div>
</template>

<script setup>
import SearchBar from "@/components/searchBar.vue";
import ResultsBox from "@/components/resultsBox.vue";
import ResultItem from "@/components/resultItem.vue";
import Popup from "@/components/popup.vue";

import { ref, computed, onBeforeMount } from "vue";
import { queryUse } from "@/composables/query.use";

const isMp4Supporting = ref(null);
const checkСompatibility = () => {
  isMp4Supporting.value = !!document
    .createElement("video")
    .canPlayType("video/mp4; codecs=avc1.42E01E,mp4a.40.2");
};
onBeforeMount(() => checkСompatibility());

const searchQueryText = ref("");
const resultOffset = ref(0);
const resultLimit = ref(50);

const { data, loading, getGifBundle } = queryUse();

try {
  getGifBundle(searchQueryText, resultOffset, resultLimit);
} catch (err) {
  throw new Error(err);
}

const result = computed(() => {
  if (!data.value) return [];

  const rawArr = Object.values(data.value);
  const preparedArr = rawArr.reduce((acc, curr) => {
    const n = {
      originURL: curr.images.original.url,
      previewURL: curr.images.downsized_small.mp4,
      reservePreviewURL: curr.images.downsized.url,
    };
    return (acc = [...acc, n]);
  }, []);
  return preparedArr;
});

const askMore = () => {
  if (result.value.length > 0 && !loading.value) {
    console.log("update ?");
  }
};

const popupIsVisible = ref(false);

const popupBlink = (timeout) => {
  popupIsVisible.value = true;
  setTimeout(() => {
    popupIsVisible.value = false;
  }, timeout);
};

const onItemClick = () => {
  popupBlink(400);
  searchQueryText.value = "";
};
</script>

<style scoped lang="stylus">
.giphy-dropdown {
  padding: 15px 16px;
  border-radius: 8px;
  background-color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;

  @media all and (max-width: 669px) {
    border-radius: 0;
    max-height: unset;
  }
}

.logo {
  margin-top: 10px;
  width: 100px;
  height: 11px;
  background: url('http://leonardo.osnova.io/a8ec5c57-6379-59db-aeb2-19b0ae3644c5/') 50% 50% / 100% auto no-repeat; // leonardo.osnova.io/a8ec5c57-6379-59db-aeb2-19b0ae3644c5/)50% 50%/100% auto no-repeat
  align-self: flex-end;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.8;
  }
}

.g-search-bar {
  flex-shrink: 0;
}

.g-results-box {
  margin-top: 22px;
  flex-grow: 1;

  @media all and (max-width: 560px) {
    margin-top: 16px;
  }
}

.g-popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
}

.popup-enter-active, .popup-leave-active {
  transition: opacity 0.3s ease;
}

.popup-enter-from, .popup-leave-to {
  opacity: 0;
}
</style>
