<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import useStudy from "./study/model/study05";
export default {
  name: "App",
  setup() {
    const threeTarget = ref(null);
    onMounted(() => {
      useStudy(threeTarget.value);
    });
    return {
      threeTarget,
    };
  },
  components: {},
};
</script>

<style>
.three-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
