<template>
  <div class="main">
    {{ isCollapse }}
  </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
<script setup>
import { watch } from "vue";

let isCollapse = ref(false);
onBeforeMount(() => {
  // console.log("Welcome", isCollapse);
  isCollapse.value = true;
});

const name_fn = () => {
  isCollapse.value = !isCollapse.value;
};

// arr[-1]; // c
</script>
