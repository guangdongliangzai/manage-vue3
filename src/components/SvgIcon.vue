<template>
  <RenderSvg />
</template>
<script setup>
import { defineComponent, createVNode } from "vue";
const props = defineProps(["size", "icons", "color"]);
const RenderSvg = defineComponent({
  render() {
    return createVNode(resolveComponent(`eleIcons-${props.icons}`));
  },
});
</script>
