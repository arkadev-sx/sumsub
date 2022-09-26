<template>
  <div class="giphy-dropdown">
    <SearchBar
      class="g-search-bar"
      v-model="searchQueryText"
      :isLoading="loading"
    />
    <ResultsBox class="g-results-box">
      <ResultItem
        v-for="item in result"
        :key="item.originURL"
        :unit="item"
        :perfomanceMode="false"
        @click="onItemClick"
      />
    </ResultsBox>
  </div>
</template>

<script setup>
import SearchBar from "@/components/searchBar.vue";
import ResultsBox from "@/components/resultsBox.vue";
import ResultItem from "@/components/resultItem.vue";
import { queryUse } from "@/composables/query.use";
import { ref, computed, onBeforeMount } from "vue";

const searchQueryText = ref("");
const resultOffset = ref(0);
const resultLimit = ref(50);

const { data, loading, getGifBundle } = queryUse();

const isMp4Supporting = ref(null);
const checkСompatibility = () => {
  isMp4Supporting.value = !!document
    .createElement("video")
    .canPlayType("video/mp4; codecs=avc1.42E01E,mp4a.40.2");
};
onBeforeMount(() => checkСompatibility());
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
const onItemClick = () => {
  searchQueryText.value = "";
};
</script>

<style scoped lang="stylus">
.giphy-dropdown {
  padding: 15px 16px;
  border-radius: 8px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;

  @media all and (max-width: 669px) {
    border-radius: 0;
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
</style>
