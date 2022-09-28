import { createApp } from "vue";
import VueObserveVisibility from "vue3-observe-visibility";
import App from "./App.vue";

import "./assets/styles/main.styl";

createApp(App).use(VueObserveVisibility).mount("#giphyDropRoot");
