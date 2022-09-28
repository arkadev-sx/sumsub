import { ref, watch } from "vue";
import { apiService } from "@/api/api.service";
import _ from "lodash";

export const queryUse = () => {
  const loading = ref(false);
  const data = ref(null);
  // const timeout = ref(null);

  const handle = _.debounce((query, offset, limit) => {
    loading.value = true;
    apiService
      .giphy(query, offset, limit)
      .then((res) => {
        data.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }, 300);

  const getGifBundle = (queryRef, offsetRef, limitRef) => {
    watch([queryRef, offsetRef, limitRef], ([query, offset, limit]) => {
      handle();
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
    });
  };

  return { loading, data, getGifBundle };
};
