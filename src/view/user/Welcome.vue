<template>
  <div class="main">{{ isCollapse }}</div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
<script setup>
let isCollapse = ref(false);
onBeforeMount(() => {
  // console.log("Welcome", isCollapse);
  isCollapse.value = true;
});
</script>
