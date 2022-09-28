import { ref } from "vue";
import { apiService } from "@/api/api.service";

export const queryUse = () => {
  const loading = ref(false);
  const data = ref(null);
  const timeout = ref(null);

  const getGifBundle = (queryRef, offsetRef, limitRef, delay) => {
    clearTimeout(timeout.value);
    if (queryRef.value !== "") {
      timeout.value = setTimeout(() => {
        loading.value = true;

        apiService
          .giphy(queryRef.value, offsetRef.value, limitRef.value)
          .then((res) => {
            data.value = res.data;
          })
          .finally(() => {
            loading.value = false;
          });
      }, delay.value);
    } else {
      data.value = [];
    }
  };

  return { loading, data, getGifBundle };
};
