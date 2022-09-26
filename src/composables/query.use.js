import { ref, watch } from "vue";
import { apiService } from "@/api/api.service";

export const queryUse = () => {
  const loading = ref(false);
  const data = ref(null);

  const getGifBundle = (queryRef, offsetRef, limitRef) => {
    watch([queryRef, offsetRef, limitRef], ([query, offset, limit]) => {
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
