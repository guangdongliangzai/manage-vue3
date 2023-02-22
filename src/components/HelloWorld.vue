<template>
  <div>
    {{ name }}
  </div>
</template>

<script setup>
import userApi from "../api/user";
const name = ref("关亚奇");
onMounted(() => {
  userApi.getUserList().then((res) => {
    console.log("------->");
    console.log(res);
  });
});
</script>
