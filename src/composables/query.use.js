import { ref, watch } from "vue";
import { apiService } from "@/api/api.service";
import _ from "lodash";

export const queryUse = () => {
  const loading = ref(false);
  const data = ref(null);
  // const timeout = ref(null);

  const handle = _.debounce((query, offset, limit) => {
    if (query !== "") {
      loading.value = true;
      apiService
        .giphy(query, offset, limit)
        .then((res) => {
          data.value = res.data;
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      data.value = [];
    }
  }, 300);

  const getGifBundle = (queryRef, offsetRef, limitRef) => {
    watch([queryRef, offsetRef, limitRef], ([query, offset, limit]) => {
      handle(query, offset, limit);
    });
  };

  return { loading, data, getGifBundle };
};
